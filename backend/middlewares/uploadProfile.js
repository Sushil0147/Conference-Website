const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./profilePhoto");
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + "-" + file.originalname)
    }
})
const profile=multer({ storage: storage });

module.exports = profile;