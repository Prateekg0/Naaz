const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt');

const {genrateToken} = require('../utils/genrateToken')


module.exports.registerUser =  async (req, res) => {
    let { fullname, email, password, contact } = req.body
    const user = await userSchema.findOne({ email: email });
    if (user) {
        return res
            .status(501)
            .send("user already present  ")
    }
    bcrypt.genSalt(10, function (err, salt) {
        if (err) { res.send(err.message) }
        bcrypt.hash(password, salt, async function (err, hashPassword) {
            try {
                const createdUser = await userSchema.create({
                    fullname,
                    email,
                    password: hashPassword,
                    contact
                })
                let token = genrateToken(createdUser)
                res.cookie('token', token)
                res.redirect('/shop')
                
            } catch (err) {
                res.send(err.message)
            }
        });
    });

}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await userSchema.findOne({ email })
    if (!user) {
        return res
            .status(503)
            .send("Email not found")
    }
    bcrypt.compare(password, user.password, function (err, result) {
        if(err){
            return res
            .status(503)
            .send(err.message)
        }else{
            if(!result){
                return res
                .status(503)
                .send("password not matched")
            }
            let token = genrateToken(user)
            res.cookie("token", token)
            res.redirect('/shop')
        }
    });
}