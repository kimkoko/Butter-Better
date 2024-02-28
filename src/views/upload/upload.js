// upload.js
const multer = require('multer');
const path = require('path');
const {Storage} = require('@google-cloud/storage');
const fs = require('fs');


const keyFilename = process.env.KEY_FILENAME; // 서비스 계정 키 파일의 경로
const projectId = process.env.PROJECT_ID; // 프로젝트 ID

// Google Cloud Storage 설정
const gcs = new Storage({
  keyFilename: process.env.KEY_FILENAME, // 서비스 계정 키 파일의 경로를 적어주세요.
  projectId: process.env.PROJECT_ID, // 프로젝트 ID를 적어주세요.
});

const bucket = gcs.bucket('elice_04'); // 저장소 이름을 적어주세요.

// 파일 저장을 위한 multer 설정
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // 파일이 저장될 경로
    cb(null, 'src/public/');
  },
  filename: function(req, file, cb) {
    // 저장될 때 사용될 파일 이름
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

const fileFilter = function (req, file, cb) {
  // 파일이 JPEG 또는 PNG 이미지인 경우 true를 반환
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    // 그렇지 않은 경우 false를 반환
    cb(null, false);
  }
};


const upload = multer({
  storage: storage,
  bucket: bucket,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3 // 3MB 파일 크기 제한
  }
});// 'file'은 클라이언트가 파일을 보낼 때 사용하는 필드의 이름입니다.


module.exports = { upload, bucket };

