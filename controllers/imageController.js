const Image = require('../models/Image');
const cloudinary = require('../config/cloudinary');

// Upload image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    console.log('Uploading file to Cloudinary:', req.file.path);
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'image-gallery',
      resource_type: 'auto'
    });

    console.log('Cloudinary upload result:', result);
    
    const image = new Image({
      title: req.body.title,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : []
    });

    await image.save();
    res.status(201).json(image);
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ 
      message: 'Error uploading image',
      error: error.message 
    });
  }
};

// Get all images
exports.getAllImages = async (req, res) => {
  try {
    const { tag } = req.query;
    let query = {};
    
    if (tag) {
      query.tags = tag;
    }
    
    const images = await Image.find(query).sort({ createdAt: -1 });
    console.log('Fetched images:', images.length);
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ 
      message: 'Error fetching images',
      error: error.message 
    });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    if (image.cloudinaryId) {
      await cloudinary.uploader.destroy(image.cloudinaryId);
    }
    
    await image.deleteOne();
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ 
      message: 'Error deleting image',
      error: error.message 
    });
  }
}; 