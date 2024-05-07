const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        if (req.path === '/api/user/login' || req.path === '/api/user/signup') {
            return next();
        }

        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({message: "Користувач не авторизований!"});
        }

        const decrypted = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decrypted;
        next();
    } catch (e) {
        res.status(401).json({message: "Користувач не авторизований!"});
    }
}