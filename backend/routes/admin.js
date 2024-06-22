const express = require('express');
const router = express.Router();

const { handleNothing, handleAuth,handleApplicantInfo, handleReviewerInfo, handlePublisherInfo, handleApplicantAllInfo, handleReviewerAllInfo, handlePublisherAllInfo, handleBar, handleFunnel, handlePie, handleLine, handleCalendar } = require('../controllers/admin');
const { authenticateAdmin } = require('../middlewares/authenticate');

router.post('/nothing', handleNothing);
router.get('/auth', authenticateAdmin, handleAuth);
router.get('/misAuth', authenticateAdmin, handleAuth);

router.route('/applicantinfo').post(handleApplicantInfo).get(handleApplicantAllInfo);
router.route('/reviewerinfo').post(handleReviewerInfo).get(handleReviewerAllInfo);
router.route('/publisherinfo').post(handlePublisherInfo).get(handlePublisherAllInfo);

router.post('/newdash/bar', handleBar);
router.post('/newdash/funnel', handleFunnel);
router.post('/newdash/pie', handlePie);
router.post('/newdash/line', handleLine);
router.post('/newdash/calendar', handleCalendar);


module.exports = router;