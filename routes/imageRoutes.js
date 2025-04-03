const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadImage, getAllImages, deleteImage } = require('../controllers/imageController');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max file size
  }
});

// Routes
router.post('/', upload.single('image'), (req, res, next) => {
  if (req.fileValidationError) {
    return res.status(400).json({ message: req.fileValidationError });
  }
  if (!req.file) {
    return res.status(400).json({ message: 'Please select an image to upload' });
  }
  next();
}, uploadImage);

router.get('/', getAllImages);
router.delete('/:id', deleteImage);

module.exports = router; 