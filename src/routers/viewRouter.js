const express = require( "express");
const router =  express.Router();
const path = require('path');

router.use('/', servestatic('home'));
router.use('/:id', servestatic('detail'));

function servestatic (resource) {
    const resourcePath = path.join(__dirname, `../views/${resource}`);
    const option = { index: `${resource}.html`};
return express.static(resourcePath, option);
}
module.exports = router;