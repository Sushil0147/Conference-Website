const express = require('express');
const router = express.Router();

const { handlePublisherDashboard, handlePublisherConferenceData, handlePublisherFinalReview, handlePublishedPapers, handlePublisherReviewerPeerData, handlePublisherReviewerCameraData, handlePublisherReviewerPresentationData } = require('../controllers/publisher');
const { authenticatePublisher } = require('../middlewares/authenticate');

router.get('/dashboard', authenticatePublisher, handlePublisherDashboard);
router.post('/conferencedata', authenticatePublisher, handlePublisherConferenceData);
router.post('/finalreview', handlePublisherFinalReview);
router.post('/publishedpaper', authenticatePublisher, handlePublishedPapers);
router.post('/publisherreviewerpeerdata', authenticatePublisher, handlePublisherReviewerPeerData);
router.post('/publisherreviewercameradata', authenticatePublisher, handlePublisherReviewerCameraData);
router.post('/publisherreviewerpresentationadata', authenticatePublisher, handlePublisherReviewerPresentationData);


module.exports = router;