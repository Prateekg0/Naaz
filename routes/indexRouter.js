const express = require('express')
const router = express.Router();
const isloggedIn = require('../middlewares/isLoggedIn')
const productSchema=  require('../models/productSchema');
const userSchema = require('../models/userSchema');

router.get('/' , (req , res)=>{
    let error = req.flash("error");
    res.render('index.ejs', {error, loggedin : false})
})

router.get('/shop' , isloggedIn, async (req, res)=>{
    let products = await productSchema.find()
    let success = req.flash("success")
    res.render('shop.ejs',{products,success})
})

router.get('/cart/:id' , isloggedIn , async (req, res)=>{
    let cartId = req.params.id 
    let user = await userSchema.findOne({email : req.user._conditions.email })
    user.cart.push(cartId)
    await user.save()
    req.flash('success' , 'Added successfully')
    res.redirect('/shop')
})

router.get('/cart' , isloggedIn ,async  (req, res)=>{
    let user = await userSchema
    .findOne({email : req.user._conditions.email })
    .populate("cart")
    let carts = user.cart
   
     
    res.render('cart.ejs', {carts})
})


module.exports = router;