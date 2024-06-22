const sendMail = require('../mail/sendMail');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/applicantModal');
const conferencepaper = require('../models/conferenceModal');

async function handleDashboard(req, res) {
    const crn = req.crn;
    res.json({msg:"success",crn:crn});
}


async function handleApplyConference(req, res) {
    
    const { crn, title, author, email, domain, abstract } = req.body;


    console.log(req.body);

    // console.log(crn);

    const file = req.file.filename;
    // const file = req.filename;
    console.log(file);

    const subject = "Conference Application Submitted";
    const text = "Your conference application has been successfully submitted. \nYour application number is";

    function generateUniqueCode() {
        const uuid = uuidv4().replace(/-/g, '');
        const code = uuid.substring(0, 16);
        return code;
    }
    const application_no = generateUniqueCode();

    try {

        const userData = await User.findOne({ crn: crn })
        const status = 0;

        if (userData) {
            await conferencepaper.create({ crn, application_no, title, author, email, domain, abstract, status, file });
            await sendMail(email, application_no, subject, text);
            res.json("success")
        } else {
            res.json("please enter correct CRN")
        }
    } catch (error) {
        res.json({ status: error })
    }

}

async function handleApplicantCheckstatus(req, res) {

    // console.log(req.crn);


    const crn = req.crn;
    console.log(crn);
    try {

        const conferenceData = await conferencepaper.find({crn})
        res.json(conferenceData);

    } catch (err) {
        console.log(err)
    }
}
module.exports = { handleDashboard, handleApplyConference, handleApplicantCheckstatus };