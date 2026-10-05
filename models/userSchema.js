const mongoose = require('mongoose')


const userSchems = mongoose.Schema({
    fullname : String,
    email : String,
    password : String,
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    }],
    contact : {
        type : Number,
        minLenght : 10
    },
    picture : String
})


module.exports = mongoose.model('user' , userSchems)