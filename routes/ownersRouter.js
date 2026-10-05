const express = require('express')
const router = express.Router();
const ownerSchems = require('../models/ownerSchema')



if(process.env.NODE_ENV === 'development'){
    router.post('/create' , async (req, res)=>{
        owners = await ownerSchems.find();
        let {fullname,email,password}= req.body
        if(owners.length > 0){
            return res
            .status(501)
            .send("You dont have permission to creat new owner")
        }else{
            const ownerCreated = await ownerSchems.create({
                fullname,
                email,
                password
            })
            res
            .status(200)
            .render('admin.ejs')
        }
    })
}

router.get('/admin' , (req, res)=>{
   let success = req.flash("success")
    res.render("createproducts.ejs" , {success})
})
router.get('/' , (req , res)=>{
    res.send('hey it working' )
})



module.exports = router;

