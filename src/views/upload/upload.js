const multer = require('multer');
const path = require('path');
const fs = require('fs');
// 파일 저장을 위한 multer 설정
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      // 파일이 저장될 경로
      cb(null, 'src/public/');
    },
    filename:
  function(req, file, cb) {
  // 저장될 때 사용될 파일 이름
  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
  });
  
  // 파일 필터링 (예: 이미지만 허용)
  const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
  cb(null, true);
  } else {
  cb(new Error('Not an image! Please upload only images.'), false);
  }
  };
  
  const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
  fileSize: 1024 * 1024 * 5 // 5MB 파일 크기 제한
  }
  });
  
  module.exports = upload;