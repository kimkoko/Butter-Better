// import 'dotenv/config';
// import { app } from './src/app';

const express = require('express'); // express 모듈 가져오기
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is listening on http://localhost:${PORT}`);
});
