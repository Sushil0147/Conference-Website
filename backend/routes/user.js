const express = require('express');
const router = express.Router();
const {verifyUser,authenticatePublisher} = require('../middlewares/authenticate')

const {handleRegister,handleLogin,handleLogout,handleProfile,handleAuth,handleUpdateProfile} = require('../controllers/user');
const profile = require('../middlewares/uploadProfile');




router.post('/register',handleRegister);
router.post('/login',handleLogin);
router.get('/auth',verifyUser,handleAuth);
router.post('/profile',verifyUser,handleProfile);
router.post('/updateprofile',verifyUser,profile.single("file"),handleUpdateProfile);
router.get('/logout',handleLogout);

module.exports = router;