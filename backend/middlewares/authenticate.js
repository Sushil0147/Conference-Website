const jwt = require('jsonwebtoken');
const User = require('../models/applicantModal');
const reviewerModal = require('../models/reviewerModal');
const publisherModal = require('../models/publisherModal');
const adminModal = require("../models/adminModal");

const verifyUser = async(req,res,next)=>{
    try {
        // verifying tokens
        const token = req.cookies.jwtoken;
        if (!token) {
            res.status(401).json("cookies not found");
            return;
        }
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        

        req.token = token;
        req._id=verifyToken._id;

        next();
    } catch (err) {
        console.log(err);
    }
}

const authenticateApplicant = async (req, res, next) => {

    try {

        // verifying tokens
        const token = req.cookies.jwtoken;
        if (!token) {
            res.status(401).json("cookies not found");
            return;
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!rootUser) {
            // throw new Error("user not found");
            res.status(401).json("user not found");
            return;
        };


        req.token = token;
        req.crn = rootUser.crn;

        next();
    } catch (err) {
        console.log(err);
    }
}


const authenticateReviewer = async (req, res, next) => {


    try {

        // verifying tokens
        const token = req.cookies.jwtoken;
        console.log("token from authentication",token);
        if (!token) {
            res.status(401).json("cookies not found");
            return;
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);
        const rootReviewer = await reviewerModal.findOne({ _id: verifyToken._id, "tokens.token": token })

        // const reviewerData = await reviewerModal.find({crn})

        if (!rootReviewer) {
            res.status(401).json("user not found");
            return;
        };

        req.token = token;
        req.crn = rootReviewer.crn;
        
        const domain = rootReviewer.domain;
        req.domain = rootReviewer.domain;

        next();
    } catch (err) {
        console.log(err);
    }
}
const authenticatePublisher = async (req, res, next) => {


    try {

        // verifying tokens
        const token = req.cookies.jwtoken;
        console.log("token from authentication", token);
        if (!token) {
            res.status(401).json("cookies not found");
            return;
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);
        const rootPublisher = await publisherModal.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!rootPublisher) {
            res.status(401).json("user not found");
            return;
        };

        req.token = token;
        req.crn = rootPublisher.crn;

        next();
    } catch (err) {
        console.log(err);
    }
}

const authenticateAdmin = async (req, res, next) => {


    try {

        // verifying tokens
        const token = req.cookies.jwtoken;
        console.log("token from authentication", token);
        if (!token) {
            res.status(401).json("cookies not found");
            return;
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyToken);
        const rootAdmin = await adminModal.findOne({ _id: verifyToken._id, "tokens.token": token })

        if (!rootAdmin) {
            res.status(401).json("user not found");
            return;
        };

        req.token = token;
        req.crn = rootAdmin.crn;

        next();
    } catch (err) {
        console.log(err);
    }
}


module.exports = {verifyUser,authenticateApplicant, authenticateReviewer, authenticatePublisher, authenticateAdmin };