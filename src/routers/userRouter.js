const express = require('express');
const router = express.Router();
const { User } = require('../db/models/userModel');
const hashPassword = require('../utils/hash-password');
const asyncHandler = require('../utils/async-handler');
const jwt = require('jsonwebtoken');
const loginRequired = require('../middlewares/loginRequired');

router.get('/', async (req, res, next) => {
  res.send('users page.');
});

// 회원가입
router.post(
  '/register',
  asyncHandler(async (req, res, next) => {
    const { name, password, email, phone } = req.body;
    const { postcode, main, detail } = req.body.address;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error('이미 가입된 회원입니다.');
    }
    const hashedPassword = hashPassword(password);
    await User.create({
      name,
      password: hashedPassword,
      email,
      phone,
      address: { postcode, main, detail },
      deleted_at: null,
      is_admin: false,
    });
    res.status(201).json({
      status: 201,
      msg: '회원가입 완료',
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
    if (correctPassword !== hashPassword(password)) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    let token = jwt.sign(
      {
        type: 'JWT',
        email: email,
      },
      process.env.SECRET_KEY
    );
    res.cookie('token', token);
    res.status(201).json({
      status: 201,
      msg: '로그인 완료',
    });
  })
);

router.get(
  '/mypage',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    res.send('users mypage');
  })
);

router.delete(
  '/:email',
  asyncHandler(async (req, res) => {
    const _email = req.params.email;
    await User.deleteOne({ email: _email });
    res.status(200).json({
      status: 200,
      msg: '회원 삭제 완료',
    });
  })
);

module.exports = router;
