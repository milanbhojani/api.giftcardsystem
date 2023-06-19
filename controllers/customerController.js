//const multer = require("multer");
const Customer = require("../models/Customer");
const mongoose = require("mongoose");

/**
 * GET /
 * New Customer Form
 */
exports.addCustomer = async (req, res) => {
  res.render("/add");
};

/**
 * POST /
 * Create New Customer
 */

const path = require('path');
const User = require("../models/User");
const uploads = path.join('uploads');

exports.postCustomer = async (req, res)=> {
  console.log(req.body);
  let avatar = ""
  if(req.file)
  {
      avatar = uploads+"/"+req.file.filename
  }
  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,    
    email: req.body.email,
    avatar:avatar
  });

  try {
    await Customer.create(newCustomer);
    console.log('New customer has been added');
    //await req.flash("info", "New customer has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * Customer Data 
*/
exports.view = async (req, res) => {
  try {
    const customer = await Customer.find()  
    res.send(customer)

  } catch (error) {
    console.log(error);
  }

}

/**
 * GET /
 * single Customer Data 
*/
exports.viewone = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    res.send(customer)

  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Edit Customer Data 
*/
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id })
    // res.render('customer/edit', {customer})
    res.send(customer)
  } catch (error) {
    console.log(error);
  }

}



/**
 * GET /
 * Update Customer Data 
*/
exports.editPost = async (req, res) => {
  
  let file= '';
  if(req.file)
  {
    file = uploads+"/"+req.file.filename;
  }else{
    file = req.body.filebefore;
  }


  try {
    await Customer.findByIdAndUpdate(req.params.id,{
      firstName: req.body.firstName,
      lastName: req.body.lastName,    
      email: req.body.email,     
      avatar: file
    });
    await res.redirect(`/`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}


/**
 * Delete /
 * Delete Customer Data 
*/
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}


/**
 * POST /
 * Add Register User
*/

exports.registerUser = async (req, res)=> {
  console.log(req.body);
  
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,    
    email: req.body.email,
    password:req.body.password
  });

  try {
    await User.create(newUser);
    console.log('New User has been added');
    //await req.flash("info", "New customer has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};







/**
 * Get /
 * Search Customer Data 
*/
// exports.searchCustomers = async (req, res) => {

//   const locals = {
//     title: "Search Customer Data",
//     description: "Free NodeJs User Management System",
//   };

//   try {
//     let searchTerm = req.body.searchTerm;
//     const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

//     const customers = await Customer.find({
//       $or: [
//         { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
//         { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
//       ]
//     });

//     res.render("search", {
//       customers,
//       locals
//     })
    
//   } catch (error) {
//     console.log(error);
//   }

// }