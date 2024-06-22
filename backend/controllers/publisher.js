const conferencepaper = require('../models/conferenceModal');
const sendMail = require('../mail/sendMail');
const publishPaperStatus = require('../models/publishStatusModal');
const peerResult = require('../models/peerModal');
const cameraResult = require('../models/cameraModal');
const presentationResult = require('../models/presentationModal');
const publisherModal = require('../models/publisherModal');

async function handlePublisherDashboard(req, res) {

    console.log(req.crn);
    const crn = req.crn;

    const publisherData = await publisherModal.findOne({crn})
  
    const applicantData = await conferencepaper.find({ status: 3 });
    
    if (applicantData) {
        res.json({applicantData:applicantData,publisherData:publisherData});
    } else {
        console.log('No matching reviewer found from applicant table');
    }
}

async function handlePublisherConferenceData(req, res) {

    const application_no = req.body;
    console.log(application_no);

    const result = await conferencepaper.find(application_no)

    if (result) {
        res.json(result)
    }
    else {
        console.log("data not found");
    }

}

async function handlePublisherFinalReview(req, res) {

    const { application_no, publisher_crn, comments, status } = req.body;

    const result = await publishPaperStatus.create(req.body)

    const confData = await conferencepaper.findOne({ application_no });

    const email = confData.email;
    console.log(email);

    const subject = `Conference ${status}`;
    const text = `${comments}. \nYour application number is`;




    if (result) {

        console.log(req.body);
        console.log("publish paper collection created");

        if (status === 'Accepted') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 3 }, { status: 4 });
            if (r) {
                await sendMail(email, application_no, subject, text);
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        else if (status === 'Rejected') {
            const r = await conferencepaper.findOneAndUpdate({ application_no, status: 3 }, { status: -1 });
            if (r) {
                await sendMail(email, application_no, subject, text);
                console.log("record updated")
            }
            else {
                console.log("record not updated")
            }
        }
        res.json("success");
    }
    else {
        console.log("publish paper collection not created");
    }

}

async function handlePublishedPapers(req, res) {
    const { application_no } = req.body;
    console.log("application number",application_no);

    try {
        const conferenceResult = await conferencepaper.find({ status: 4 });
        if (conferenceResult) {

            const publisherResult = await publishPaperStatus.find(application_no)// find based on status accepted
            // console.log({ conferenceResult, publisherResult });
            res.json({ conferenceResult: conferenceResult, publisherResult: publisherResult });
        }
        else {
            res.json("no record found")
            console.log("record not updated")
        }
    } catch (err) {
        console.log(err);
    }
}

async function handlePublisherReviewerPeerData(req, res) {

    const application_no = req.body;
    console.log(application_no);

    try {
        const result = await peerResult.find(application_no);
        if (result) {
            console.log(result);
            res.json(result);
        }
        else {
            console.log("record not found");
        }
    }
    catch (err) {
        console.log("error occured...");
    }
}


async function handlePublisherReviewerCameraData(req, res) {
    const application_no = req.body;
    console.log(application_no);

    try {
        const result = await cameraResult.find(application_no);
        if (result) {
            console.log(result);
            res.json(result);
        }
        else {
            console.log("record not found");
        }
    }
    catch (err) {
        console.log("error occured...");
    }
}

async function handlePublisherReviewerPresentationData(req, res) {
    const application_no = req.body;
    console.log(application_no);

    try {
        const result = await presentationResult.find(application_no);
        if (result) {
            console.log(result);
            res.json(result);
        }
        else {
            console.log("record not found");
        }
    }
    catch (err) {
        console.log("error occured...");
    }
}

module.exports = { handlePublisherDashboard, handlePublisherConferenceData, handlePublisherFinalReview, handlePublishedPapers, handlePublisherReviewerPeerData, handlePublisherReviewerCameraData, handlePublisherReviewerPresentationData };