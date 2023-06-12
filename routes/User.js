const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require("multer");
const path = require('path');
const Authenticate  = require('../middleware/Authenticate');

//file upload start
const uploads = path.join('uploads');

//const multer = require('multer');
const storage = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,uploads);
    },
    filename : (req,file,cb) => {
        cb(null,file.fieldname+"-"+Date.now());
    }
});

const upload = multer({storage : storage}).single('avatar');
//file upload end


/**
 *  Customer Routes 
*/
// router.get('/signup', userController.addUser);
router.post('/signup',upload,userController.postUser);
router.post('/signin',userController.postUserlogin)
router.get('/getdata',Authenticate,userController.getdata)
router.post('/addgiftcard',Authenticate,userController.postgiftcard)


module.exports = router;