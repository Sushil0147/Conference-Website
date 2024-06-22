const mongoose = require('mongoose');

const conferenceSchema = new mongoose.Schema(
    {
        crn: {
            type: String,
            // required : true
        },
        application_no: {
            type: String,
            // required : true
        },
        title: {
            type: String,
            // required : true
        },
        author: {
            type: String,
            // required : true
        },
        email: {
            type: String,
            // required : true
        },
        domain: {
            type: String,
            enum: ['Healthcare', 'Technology', 'Cloud','Banking','Machine Learning','Robotics'],
            // required : true
        },
        abstract: {
            type: String,
            // required : true
        },
        status: {
            type: Number,
            // required : true
        },
        file: {
            type: String,       //here we have to store url/path of pdf
            // required : true
        },
        date: {
            type: Date,
            default: Date.now 
        }
    })

const conferencepaper = mongoose.model('conferencepaper', conferenceSchema);

module.exports = conferencepaper;
