const reviewerModal = require('../models/reviewerModal');
const conferencepaper = require('../models/conferenceModal');
const peerResult = require('../models/peerModal');
const cameraResult = require('../models/cameraModal');
const presentationResult = require('../models/presentationModal');




async function handleReviewerDashboard(req, res) {

    const crn = req.crn;
    console.log(crn);

    try {

        const reviewerData = await reviewerModal.find({crn})

        if (reviewerData) {
            const domain = req.domain;
            const applicantData = await conferencepaper.find({ domain: domain, status: { $lt: 3, $gt: -1 } });
            // console.log(applicantData);
            if (applicantData) {
                res.json({ applicantData: applicantData, reviewerData: reviewerData });
            } else {
                console.log('No matching reviewer found from applicant table');
            }
        } else {
            console.log('No matching reviewer found from reviewer table');
        }

    } catch (err) {
        console.log(err)
    }
}

async function handlePeerScreening(req, res) {

    const application_no = req.body;
    // console.log(application_no);

    const result = await conferencepaper.find(application_no)

    if (result) {
        console.log(result)
        res.json(result)
    }
    else {
        console.log("data not found");
    }

}

async function handlePeerForm(req, res) {

    const { application_no, comments, marks, reviewer_crn, status } = req.body;


    const result = peerResult.create({ application_no, comments, marks, reviewer_crn, status });

    if (result) {

        console.log("peer data created");

        if (status === 'Recommend') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 0 }, { status: 1 });
            if (r) {
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        else if (status === 'Not Recommend') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 0 }, { status: -1 });
            if (r) {
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        res.json({ msg: "success", peerFormData: req.body });
    }
    else {
        console.log("peer data not created");
    }
}

async function handleCameraForm(req, res) {
    const { application_no, comments, marks, reviewer_crn, status } = req.body;

    const result = cameraResult.create({ application_no, comments, marks, reviewer_crn, status });

    if (result) {

        console.log("camera data created");

        if (status === 'Recommend') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 1 }, { status: 2 });
            if (r) {
                console.log("record updated")
            }
            else {
                console.log("record updated")
            }
        }
        else if (status === 'Not Recommend') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 1 }, { status: -1 });
            if (r) {
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        res.json({ msg: "success", cameraFormData: req.body });
    }
    else {
        console.log("camera data not created");
    }
}

async function handlePresentationForm(req, res) {

    const { application_no, comments, marks, reviewer_crn, status } = req.body;

    const result = presentationResult.create({ application_no, comments, marks, reviewer_crn, status });

    if (result) {

        console.log("presentation data created");

        if (status === 'Recommend') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 2 }, { status: 3 });
            if (r) {
                console.log("record updated")
            }
            else {
                console.log("record updated")
            }
        }
        else if (status === 'Not Recommend') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 2 }, { status: -1 });
            if (r) {
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        res.json({ msg: "success", presentationFormData: req.body });
    }
    else {
        console.log("presentation data not created");
    }
}

module.exports = { handleReviewerDashboard, handlePeerScreening, handlePeerForm, handleCameraForm, handlePresentationForm };