const express = require('express');
const router = express.Router()
const {userRegister, userLogin,updateUser} = require('../controllers/user')

router.post('/register',userRegister);
router.post('/login',userLogin)
//router.patch('/updateuser',updateUser)


module.exports = router