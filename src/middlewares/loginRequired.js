const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {   
    try {
        const userToken = req.cookies.token;
        const decodedUser = jwt.verify(userToken, process.env.SECRET_KEY);
        const userEmail = decodedUser.email;
        console.log(userEmail);

        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 400,
            msg: "error"
        });
    }
}
