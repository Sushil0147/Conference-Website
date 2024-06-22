const db = require('../db/conn');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const sendMail = require('../mail/sendMail');
const User = require('../models/applicantModal');
const reviewerModal = require('../models/reviewerModal');
const publisherModal = require('../models/publisherModal');
const adminModal = require('../models/adminModal');

async function handleAuth(req, res) {
    let token = req.token;
    try {
        if (token) {
            res.json("success");
        }
    }
    catch (err) {
        console.log(err);
    }
}


async function handleRegister(req, res) {
    const { name, email, category, domain, password } = req.body;

    // console.log(req.body);


    function generateCRN() {
        const uuid = uuidv4().replace(/-/g, '');
        const code = uuid.substring(0, 11).toUpperCase();
        return code;
    }
    const crn = generateCRN();


    if (category === 'Applicant') {

        let flag = true;

        await User.findOne({ email: email })
            .then(existingUser => {
                console.log(existingUser);
                if (existingUser && existingUser.category === category) {
                    res.json('already');
                    flag = false;
                }
                else {
                    User.create({ crn, name, email, category, password })
                        .then(result => {
                            console.log(result)
                            res.json("Success")
                        })
                        .catch(err => res.json(err));
                }

            })

        if (flag) {

            const subject = "Registration succcessful";
            const text = "Your profile has been successfully created.\nYour CRN number is"
            console.log(crn);
            await sendMail(email, crn, subject, text);
        }

    }
    else if (category === 'Reviewer') {

        let flag = true;

        await reviewerModal.findOne({ email: email })
            .then(existingUser => {
                console.log(existingUser);
                if (existingUser) {
                    res.json('already');
                    flag = false;
                }
                else {
                    reviewerModal.create({ crn, name, email, category, domain, password })
                        .then(result => {
                            console.log(result)
                            res.json("Success")
                        })
                        .catch(err => res.json(err));
                }
            })
        if (flag === true) {

            // console.log("inside flag...if")
            const subject = "Registration succcessful";
            const text = "Your profile has been successfully created.\nYour CRN number is"
            console.log(crn);
            await sendMail(email, crn, subject, text);
        }
    }
    // else {

    //    await adminModal.findOne({ email: email })
    //         .then(existingUser => {
    //             console.log(existingUser);
    //             if (existingUser) {
    //                 res.json('already');
    //             }
    //             else {
    //                 adminModal.create({crn, name, email, password})
    //                     .then(result => {
    //                         console.log(result)
    //                         res.json("Success")
    //                     })
    //                     .catch(err => res.json(err));
    //             }
    //         })
    // }


}
async function handleLogin(req, res) {
    const { email, category, password } = req.body;


    if (category === 'Applicant') {

        let token;

        const generateTokenForApplicant = async (user) => {
            token = await user.generateAuthToken();
            console.log("token generated for applicant", token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.status(200).json({ status: "Success", data: user });
        }

        await User.findOne({ email: email })
            .then(user => {
                console.log(user);
                if (user) {
                    if (user.password === password) {
                        generateTokenForApplicant(user);
                    }
                    else if (user.password != password) {
                        res.json("passworderror");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed");
                }
            })
    }
    else if (category === 'Reviewer') {

        let token;

        const generateTokenForReviewer = async (existingReviewer) => {

            token = await existingReviewer.generateAuthToken();
            console.log("token generated for reviewer", token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.status(200).json({ status: "Success", data: existingReviewer });
        }

        await reviewerModal.findOne({ email: email })
            .then(existingReviewer => {
                console.log(existingReviewer);
                if (existingReviewer) {
                    if (existingReviewer.password === password) {

                        generateTokenForReviewer(existingReviewer);
                    }
                    else if (existingReviewer.password != password) {
                        res.json("The password is incorrect");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed")
                }
            })
    }
    else if (category === 'Publisher') {

        let token;

        const generateTokenForPublisher = async (existingPublisher) => {

            token = await existingPublisher.generateAuthToken();
            console.log("token generated for publisher", token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.status(200).json({ status: "Success", data: existingPublisher });
        }

        await publisherModal.findOne({ email: email })
            .then(existingPublisher => {
                console.log(existingPublisher);
                if (existingPublisher) {
                    if (existingPublisher.password === password) {

                        generateTokenForPublisher(existingPublisher);

                    }
                    else if (existingPublisher.password != password) {
                        res.json("The password is incorrect");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed")
                }
            })
    }
    else {

        let token;

        const generateTokenForAdmin = async (existingAdmin) => {
            token = await existingAdmin.generateAuthToken();
            console.log("token generated for admin", token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.status(200).json({ status: "Success", data: existingAdmin });
        }

        await adminModal.findOne({ email: email })
            .then(existingAdmin => {
                console.log(existingAdmin);
                if (existingAdmin) {
                    if (existingAdmin.password === password) {

                        generateTokenForAdmin(existingAdmin);
                    }
                    else if (existingAdmin.password != password) {
                        res.json("The password is incorrect");
                    }
                    else {
                        res.json("choose correct category");
                    }
                }
                else {
                    res.json("No record existed")
                }
            })
    }
}

async function handleProfile(req, res) {

    const category = req.body.category;
    let id = req._id;
    try {
        if (category === "reviewer") {
            const data = await reviewerModal.findOne({ _id: id });
            if (data) {
                res.status(201).json(data);
            }
        }
        else if (category === "publisher") {
            const data = await publisherModal.findOne({ _id: id });
            if (data) {
                res.status(201).json(data);
            }
        }
        else if (category === "admin") {
            const data = await adminModal.findOne({ _id: id });
            if (data) {
                res.status(201).json(data);
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function handleUpdateProfile(req, res) {

    const { category, phone, address, gender, aboutme, countryid, stateid, zip } = req.body;
    const file = req.file.filename;
    const dataToUpdate = { phone, address, gender, countryid, stateid, zip, aboutme, file };
    const _id = req._id;

    try {
        if (category === "reviewer") {
            const update = await reviewerModal.findByIdAndUpdate(
                { _id: _id },
                { $set: { profiledetails : dataToUpdate } },
                { upsert: true, returnOriginal: false, new: true }
            );
            if (update) {
                console.log("data updated successfully");
                res.status(201).json("success");
            }
            else {
                console.log("no data updated");
                res.status(404).json("no data updated");
            }
        }
        else if (category === "publisher") {
            const update = await publisherModal.findByIdAndUpdate(
                { _id: _id },
                { $set: { profiledetails : dataToUpdate } },
                { upsert: true, returnOriginal: false, new: true }
            );
            if (update) {
                console.log("data updated successfully");
                res.status(201).json("success");
            }
            else {
                console.log("no data updated");
                res.status(404).json("no data updated");
            }
        }
        else if (category === "admin") {
            const update = await adminModal.findByIdAndUpdate(
                { _id: _id },
                { $set: { profiledetails : dataToUpdate } },
                { upsert: true, returnOriginal: false, new: true }
            );
            if (update) {
                console.log("data updated successfully");
                res.status(201).json("success");
            }
            else {
                console.log("no data updated");
                res.status(404).json("no data updated");
            }
        }
    } catch (err) {
        console.log(err);
    }
}

async function handleLogout(req, res) {

    res.clearCookie("jwtoken");
    res.status(200).json("success");

}

module.exports = { handleAuth, handleRegister, handleLogin, handleProfile, handleUpdateProfile, handleLogout };
