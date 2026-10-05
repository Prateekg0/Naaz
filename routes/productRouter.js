const express = require('express')
const router = express.Router();
const upload = require('../config/multerConfig')
const productSchema = require('../models/productSchema')

router.post('/create', upload.single('image'), async (req , res)=>{
   try{ let {name , price , discount , bgcolor , panelcolor , textcolor} = req.body;

    let product = await productSchema.create({
        image : req.file.buffer,
        name,
        price,
        discount,
        bgcolor, 
        panelcolor,
        textcolor
    })
    console.log(req.files)
    req.flash('success' , 'Product created successfully')
    res.redirect('/owners/admin')
    }
    catch(err){
        res.send(err.message);
    }
})

module.exports = router