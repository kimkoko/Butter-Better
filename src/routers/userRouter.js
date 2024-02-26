const express = require('express');
const router = express.Router();
const { User } = require('../db/models/userModel');
const { hashPassword, comparePassword } = require('../utils/hash-password');
const asyncHandler = require('../utils/async-handler');
const jwt = require('jsonwebtoken');
const loginRequired = require('../middlewares/loginRequired');
const UserDTO = require('../utils/userValidator');

router.get('/', async (req, res, next) => {
  res.send('users page.');
});

// 회원가입
router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const { name, password, email, phone, address } = req.body;
    const userData = new UserDTO(name, password, email, phone, address);
    UserDTO.validateUserData(userData);

    const user = await User.findOne({ email });
    if (user) {
      throw new Error('이미 가입된 회원입니다.');
    }
    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      password: hashedPassword,
      email,
      phone,
      address,
      deleted_at: null,
      is_admin: false,
    });
    res.status(201).json({
      msg: '회원가입 완료'
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('이메일이 일치하지 않습니다.');
    const correctPassword = user.password;
    if (!comparePassword(password, correctPassword)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    let token = jwt.sign(
      {
        sub: user._id,
        email: email,
        name: user.name
      },
      process.env.SECRET_KEY
    );
    res.cookie('token', token);
    res.status(201).json({
      msg: '로그인 완료'
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

router.put(
  '/mypage/edit',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const updateUser = await User.findByIdAndUpdate(req.user.sub, req.body, { new: true });
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
