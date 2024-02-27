const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {   
    try {
        const userToken = req.cookies.token;
        const decodedUser = jwt.verify(userToken, process.env.SECRET_KEY);
        req.user = decodedUser;
        
        next();

    } catch (err) {
        next(err);
    }
}
