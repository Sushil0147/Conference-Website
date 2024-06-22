const xlsx = require("xlsx");
const conferencepaper = require('../models/conferenceModal');
const reviewerModal = require('../models/reviewerModal');
const publisherModal = require('../models/publisherModal');
const adminModal = require("../models/adminModal");

// Administration work
async function handleApplicantInfo(req, res) {
    try {
        const { cat, inp, sts } = req.body;
        console.log(sts)
        var confData;
        if (cat === "none") {
            if (sts == 5) {
                confData = await conferencepaper.find({});
            } else if (sts == 0) {
                confData = await conferencepaper.find({
                    status: { $gte: 0, $lte: 3 },
                });
            } else {
                confData = await conferencepaper.find({ status: sts });
            }
        } else {
            if (sts == 5) {
                confData = await conferencepaper.find({ [cat]: inp });
            } else if (sts == 0) {
                confData = await conferencepaper.find({
                    [cat]: inp,
                    status: { $gte: 0, $lte: 3 },
                });
            } else {
                confData = await conferencepaper.find({ [cat]: inp, status: sts });
            }
        }
        res.json(confData);
    } catch (err) {
        console.log(err);
    }
}

async function handleReviewerInfo(req, res) {

    try {
        const { cat, inp, sts } = req.body;
        // console.log(cat,inp,sts)
        var reviewerData = await reviewerModal.find({ [cat]: inp });
        res.json(reviewerData);
    } catch (err) {
        console.log(err);
    }
}

async function handlePublisherInfo(req, res) {

    try {
        const { cat, inp, sts } = req.body;
        // console.log(cat,inp,sts)
        var publisherData = await publisherModal.find({ [cat]: inp });
        res.json(publisherData);
    } catch (err) {
        console.log(err);
    }
}


// all information of applicant, reviewer , publisher
async function handleApplicantAllInfo(req, res) {
    await conferencepaper
        .find({})
        .select({
            _id: 0,
            crn: 1,
            application_no: 1,
            title: 1,
            author: 1,
            email: 1,
            domain: 1,
            abstract: 1,
            status: 1,
            date: 1,
        })
        .then((confData) => {
            if (confData.length > 0) {
                let data = JSON.parse(JSON.stringify(confData));
                let workbook = xlsx.utils.book_new();
                let worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Conference_Data");
                xlsx.writeFile(workbook, "./conferenceData/Conference_Data.xlsx");
                res.json({ sts: "success", all: confData });
            }
        })
        .catch((err) => {
            res.json("Error while fetching Data from database !" + err);
        });
}

async function handleReviewerAllInfo(req, res) {
    await reviewerModal
        .find({})
        .select({
            _id: 0,
            crn: 1,
            name: 1,
            email: 1,
            domain: 1,
            date: 1,
        })
        .then((revData) => {
            if (revData.length > 0) {
                let data = JSON.parse(JSON.stringify(revData));
                let workbook = xlsx.utils.book_new();
                let worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Reviewer_Data");
                xlsx.writeFile(workbook, "./reviewerData/Reviewer_Data.xlsx");
                res.json({ sts: "success", all: revData });
            }
        })
        .catch((err) => {
            res.json("Error while fetching Data from database !");
        });
}

async function handlePublisherAllInfo(req, res) {
    await publisherModal
        .find({})
        .select({
            _id: 0,
            crn: 1,
            name: 1,
            email: 1,
            date: 1,
        })
        .then((pubData) => {
            if (pubData.length > 0) {
                let data = JSON.parse(JSON.stringify(pubData));
                let workbook = xlsx.utils.book_new();
                let worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, "Publisher_Data");
                xlsx.writeFile(workbook, "./publisherData/Publisher_Data.xlsx");
                res.json({ sts: "success", all: pubData });
            }
        })
        .catch((err) => {
            res.json("Error while fetching Data from database !");
        });
}



// admin chart Work (MIS)
const domain = [
    "Healthcare",
    "Technology",
    "Cloud",
    "Banking",
    "Machine Learning",
    "Robotics",
];
let rejected, published, submitted, inprogress, peer, cam, pres;
const countData = async (status) => {
    let counts = [];
    for (let i = 0; i < domain.length; i++) {
        counts.push(
            conferencepaper.countDocuments({ domain: domain[i], status: status })
        );
    }
    return Promise.all(counts);
};

async function handleNothing(req, res) {
    try {
        res.json("");
    } catch (err) { }
}

async function handleAuth(req, res) {
    const crn = req.crn;
   
    const adminData = await adminModal.findOne({crn});
    try {
        res.json({msg: "success",adminData : adminData});
    } catch (err) { }
}



// for bar chart
async function handleBar(req, res) {
    Promise.all([
        countData(-1), // rejected
        countData(0), // submitted
        countData(1), // peer
        countData(2), // cam
        countData(3), // pres
        countData(4), // published
        countData({ $gte: 0, $lte: 3 }), // inprogress
    ])
        .then(
            ([
                rejectedCounts,
                submittedCounts,
                peerCounts,
                camCounts,
                presCounts,
                publishedCounts,
                inprogressCounts,
            ]) => {
                rejected = rejectedCounts;
                submitted = submittedCounts;
                peer = peerCounts;
                cam = camCounts;
                pres = presCounts;
                published = publishedCounts;
                inprogress = inprogressCounts;
                res.json({
                    reject: rejected,
                    publish: published,
                    submit: submitted,
                    inpro: inprogress,
                    peerdata: peer,
                    camdata: cam,
                    presdata: pres,
                });
            }
        )
        .catch((err) => {
            console.error(err);
            res.json({ err: "Database Error" });
        });
}


// for funnel chart
async function handleFunnel(req, res) {

    Promise.all([
        conferencepaper.countDocuments({ status: { $gte: 0 } }), // submitted
        conferencepaper.countDocuments({ status: { $gte: 1 } }), // peer
        conferencepaper.countDocuments({ status: { $gte: 2 } }), // cam
        conferencepaper.countDocuments({ status: { $gte: 3 } }), // pres
        conferencepaper.countDocuments({ status: { $gte: 4 } }), // published
    ])
        .then(
            (result) => {
                res.json(result)
            }
        )
        .catch((err) => {
            res.json({ err: "Database Error" });
        });
}

// for pie chart
async function handlePie(req, res) {

    Promise.all(domain.map((ele) => {
        return reviewerModal.countDocuments({ domain: ele });
    }))
        .then(
            (result) => {
                res.json(result);
            }
        )
        .catch((err) => {
            console.error(err);
            res.json({ err: "Database Error" });
        });

}

// for Line
async function handleLine(req, res) {

    Promise.all(domain.map((ele) => {
        return conferencepaper.countDocuments({ domain: ele });
    }))
        .then(
            (result) => {
                res.json(result);
            }
        )
        .catch((err) => {
            console.error(err);
            res.json({ err: "Database Error" });
        });
}

// for Calendar
async function handleCalendar(req, res) {
    conferencepaper.find({}).select("-_id date")
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            res.json({ err: "Database Error" });
        });
}

module.exports = { handleAuth, handleApplicantInfo, handleReviewerInfo, handlePublisherInfo, handleApplicantAllInfo, handleReviewerAllInfo, handlePublisherAllInfo, handleNothing, handleBar, handleFunnel, handlePie, handleLine, handleCalendar }; 