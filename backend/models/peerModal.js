const mongoose =require("mongoose");

const peerSchema = new mongoose.Schema({

    application_no : {
        type: String,
        // required : true
    },
    comments : {
        type: String,
        // required : true
    },
    marks : {
        type: Number,
        // required : true
    },
    reviewer_crn : {
        type: String,
        // require : true
    },
    status : {
        type: String,
        enum:['Recommend','Not Recommend'],
        // required : true
    },
   
    date: {
        type: String,
        default: new Date().toLocaleString()
    }
})


const peerResult = mongoose.model("peerresult",peerSchema);

module.exports = peerResult;