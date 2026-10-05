const jwt = require('jsonwebtoken')
const userSchema = require('../models/userSchema')


module.exports = async function (req, res, next) {
    if (!req.cookies.token) {
        req.flash("error", "you need to login first")
        return res.redirect('/')
    }
    try {
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY, function (err, decoded) {
            let user = userSchema
            .findOne({email : decoded.email})
            .select("-password")
            req.user = user;
            next();
        });
    } catch (err) {
        req.flash("error" , "something went wrong")
        res.redirect("/")
    }
}