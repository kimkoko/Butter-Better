const express = require( "express");
const router =  express.Router();
const path = require('path');
const multer = require('multer');

router.use('/', servestatic('home'));
router.use('/admin', servestatic('admin'));
router.use('/cart', servestatic('cart'));
router.use('/category', servestatic('category'));
router.use('/detail', servestatic('detail'));
router.use('/order', servestatic('order'));
router.use('/upload', servestatic('upload'));



function servestatic (resource) {
    const resourcePath = path.join(__dirname, `../views/${resource}`);
    const option = { index: `${resource}.html`};
return express.static(resourcePath, option);
}
module.exports = router;