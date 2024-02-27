module.exports = (req, res, next) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        throw new Error("관리자만 접근 가능한 페이지입니다.");
    }
}