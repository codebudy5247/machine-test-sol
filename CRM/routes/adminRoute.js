const express=require('express');
const router=express.Router();
const {CreateAdmin,LoginAdmin}=require('../controller/adminController')

router.post('/admin/signup',CreateAdmin);
router.post('/admin/signin',LoginAdmin);

module.exports=router;