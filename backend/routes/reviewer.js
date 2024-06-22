const express = require('express');
const router = express.Router();


const { handleReviewerDashboard, handlePeerScreening, handlePeerForm, handleCameraForm, handlePresentationForm } = require('../controllers/reviewer');
const { authenticateReviewer } = require('../middlewares/authenticate');





router.post('/reviewerdashboard', authenticateReviewer, handleReviewerDashboard);
router.post('/conferencedata', authenticateReviewer, handlePeerScreening);
router.post('/peerform', authenticateReviewer, handlePeerForm);
router.post('/cameraform', authenticateReviewer, handleCameraForm);
router.post('/presentationform', authenticateReviewer, handlePresentationForm);


module.exports = router;