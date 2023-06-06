require('dotenv').config();
require('./config/db')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

var app = express()
app.use(bodyParser.json())
app.use(cors({origin:'*'}))



// require('dotenv').config();

// const express = require('express');
// const expressLayout = require('express-ejs-layouts');
    // const methodOverride = require('method-override');
 const { flash } = require('express-flash-message');
// const session = require('express-session');
const connectDB = require('./config/db');
const path=require('path');

// const app = express();
// const port = 5000 || process.env.PORT;

// // Connect to Database  
 connectDB();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride('_method'));

// // Static Files
app.use(express.static('public'));
app.use('/uploads',express.static(path.join(__dirname , "/uploads")))


// // Express Session
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//     }
//   })
// );

// // Flash Messages
 //app.use(flash({ sessionKeyName: 'flashMessage' }));

// // Templating Engine
// app.use(expressLayout);
// app.set('layout', './layouts/main');
// app.set('view engine', 'ejs');

// // Routes
app.use('/', require('./routes/customer'))

// // Handle 404
// app.get('*', (req, res) => {
//   res.status(404).render('404');
// });

// app.listen(port, ()=> {
//   console.log(`App listeing on port ${port}`)
// });

app.listen(4000,()=>console.log('Server started at : 4000'))