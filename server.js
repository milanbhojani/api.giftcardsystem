const express = require('express');
const app = express();

const port = 8000 || process.env.PORT;

// Connect to Database  
const connectDB = require('./db/connect');
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use('/', require('./routes/r_customer'))

app.listen(port, ()=>{
    console.log(`App listeing on port ${port}`)
});