require('dotenv').config();
require('./config/db')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'*'}))

const connectDB = require('./config/db');
const path=require('path');

// Connect to Database  
 connectDB();

 // Static Files
app.use(express.static('public'));
app.use('/uploads',express.static(path.join(__dirname , "/uploads")))

// // Routes
app.use('/', require('./routes/User'))
app.listen(4000,()=>console.log('Server started at : 4000'))