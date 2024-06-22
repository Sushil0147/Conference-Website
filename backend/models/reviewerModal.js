const mongoose =require("mongoose");
const jwt = require('jsonwebtoken');

// creating schema
const reviewerSchema = new mongoose.Schema({

    crn : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        require : true
    },
    password : {
        type: String,
        require : true
    
    },
    domain : {
        type :String,
        enum :['Healthcare','Technology','Cloud','Banking','Machine Learning','Robotics'],
        require:true
    },
    profiledetails : [
        {
            category :{
                type :String
            },
            phone :{
                type :String
            },
            address :{
                type :String
            },
            gender :{
                type :String
            },
            countryid :{
                type :Number
            },
            stateid :{
                type :Number
            },
            zip :{
                type :Number
            },
            aboutme :{
                type :String
            }
        }
    ],
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now 
    },

})

// here we are generating tokens whenever REVIEWER logged-in
reviewerSchema.methods.generateAuthToken = async function () {


    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

//collection creation
const reviewerModal = mongoose.model("reviewer",reviewerSchema);

module.exports = reviewerModal;