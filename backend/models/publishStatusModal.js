const mongoose = require("mongoose");

// creating schema
const publishPaperStatusSchema = new mongoose.Schema({

    application_no: {
        type: String,
        // required : true
    },
    publisher_crn: {
        type: String,
        // required : true
    },
    status: {
        type: String,
        // require: true
    },
    comments: {
        type: String,
        // require : true
    },
    date: {
        type: String,
        default: new Date().toLocaleString()
    },
})

//collection creation
const publishPaperStatus = mongoose.model("publishpaperstatus", publishPaperStatusSchema);

module.exports = publishPaperStatus;