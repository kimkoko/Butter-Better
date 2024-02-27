const express = require('express');
const uploadRouter = express.Router();
const upload = require('../views/upload/upload'); 

// 이미지 파일 업로드를 처리하는 라우터
uploadRouter.post('/', upload.single('file'), (req, res, next) => {
    try {
      // 파일이 성공적으로 업로드 되었는지 확인
      if (req.file) {
        res.status(200).json({
          message: 'File uploaded successfully',
          fileInfo: req.file
        });
      } else {
        throw new Error('File upload failed');
      }
    } catch (error) {
      next(error);
    }
  });

  
  
  module.exports = uploadRouter;