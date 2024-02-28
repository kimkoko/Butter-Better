const express = require('express');
const router = express.Router();
const { User } = require('../db/models/userModel');
const asyncHandler = require('../utils/async-handler');
const loginRequired = require('../middlewares/loginRequired');
const adminOnly = require('../middlewares/adminOnly');
const userService = require('../services/userService');

router.get('/', async (req, res, next) => {
  res.send('users page.');
});

// 회원가입
router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const { name, password, email, phone, address } = req.body;
    await userService.registerUser(name, password, email, phone, address);
    res.status(201).json({
      msg: '회원가입 완료'
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    
    const {token, role} = await userService.loginUser(email, password);
    res.cookie('token', token, {path: '/'});

    res.status(201).json({
      msg: '로그인 완료',
      role
    });
    
  })
);

router.get(
  '/mypage',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.sub);
    res.json({
      msg: `${req.user.name}의 마이페이지 입니다.`,
      user
    });
  })
);

router.patch(
  '/mypage/edit',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const updateUser = await userService.updateUser(req.user.sub, req.body);
    res.status(200).json({
      msg: "회원 정보 수정 완료",
      updateUser
    })
  })
)

router.get(
  '/logout',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    res.clearCookie('token');
    res.json({
      msg: "로그아웃 완료"
    })
  })
);

// 회원 탈퇴 시 비밀번호 null, deleted_at 에 탈퇴 시간 작성
// 탈퇴 해도 db에는 정보 남아있음
router.patch(
  '/delete',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const deleteUser = await userService.deleteUser(req.user.sub);
    res.status(200).json({
      msg: "회원 탈퇴 처리 완료",
      deleteUser
    })
  })
)

// 관리자만 db에서 유저 정보 삭제?
router.delete(
  '/',
  loginRequired,
  asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.user.sub);
    res.clearCookie('token');
    res.status(200).json({
      msg: '회원 삭제 완료',
      data: deletedUser
    });
  })
);

module.exports = router;
