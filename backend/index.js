const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({path : './.env'});
const port = process.env.PORT || 5000 ;
const cors = require('cors');
const db = require('./db/conn');
const cookieParser = require('cookie-parser');

//middleware
app.use(cors({origin:true,credentials:true}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use("/conferenceData", express.static("conferenceData"));
app.use("/reviewerData", express.static("reviewerData"));
app.use("/publisherData", express.static("publisherData"));


// files accessable from anywhere
app.use("/uploads", express.static("uploads"));
app.use("/profilePhoto", express.static("profilePhoto"));

//importing all the routes file
const userRoute = require('./routes/user');
const applicant = require('./routes/applicant');
const reviewer = require('./routes/reviewer');
const publisher = require('./routes/publisher');
const admin = require('./routes/admin');


//routes
app.use('/user', userRoute);
app.use('/applicant',applicant);
app.use('/reviewer',reviewer);
app.use('/publisher',publisher);
app.use('/admin',admin);



app.get('/', async (req, res) => {
    res.send("success...")
})


app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});
