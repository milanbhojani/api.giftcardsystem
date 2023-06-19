const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const multer = require("multer");
const path = require('path');

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
//router.get('/', customerController.homepage);
//router.get('/about', customerController.about);
router.get('/add', customerController.addCustomer);
router.post('/add',upload,customerController.postCustomer);
router.get('/view', customerController.view);
router.get('/view/:id', customerController.viewone);
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id',upload, customerController.editPost);
router.delete('/edit/:id', customerController.deleteCustomer);
router.post('/register',customerController.registerUser);

//router.post('/search', customerController.searchCustomers);

module.exports = router;