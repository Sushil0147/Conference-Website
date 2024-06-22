const express = require('express');
const router = express.Router();


const { handleDashboard, handleApplyConference, handleApplicantCheckstatus } = require('../controllers/applicant');
const upload = require('../middlewares/uploadFile');
const {authenticateApplicant} = require('../middlewares/authenticate');


router.get('/dashboard', authenticateApplicant, handleDashboard);
router.route('/applyconference').get(authenticateApplicant, handleDashboard).post(upload.single("file"), handleApplyConference);
router.get('/checkstatus', authenticateApplicant, handleApplicantCheckstatus);

module.exports = router;

