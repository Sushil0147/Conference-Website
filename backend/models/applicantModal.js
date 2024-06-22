const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


// creating schema
const RegisterSchema = new mongoose.Schema({

    crn: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    category: {
        type: String,
        enum: ['Applicant', 'Reviewer', 'Admin'],
        required: true
    },
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


// here we are generating tokens whenever APPLICANT logged-in


RegisterSchema.methods.generateAuthToken = async function () {


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




const applicant = mongoose.model("applicant", RegisterSchema);

module.exports = applicant;



