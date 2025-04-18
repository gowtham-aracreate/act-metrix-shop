const AWS = require('aws-sdk');
const multer = require('multer');
const fs = require('fs');

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

// Set up multer for file handling
const storage = multer.memoryStorage(); // Store file in memory (no need to save it locally)
const upload = multer({ storage: storage }).single('image'); // Accept a single file named 'image'

const uploadToS3 = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).send('Error uploading file');
    }

    // Create S3 upload parameters
    const params = {
      Bucket: 'metrix-shop', // your S3 bucket name
      Key: `profileImages/${Date.now()}-${req.file.originalname}`, // Set the folder and file name
      Body: req.file.buffer, // File buffer from multer
      ContentType: req.file.mimetype,
      ACL: 'public-read', // Make the image publicly accessible
    };

    // Upload to S3
    try {
      const data = await s3.upload(params).promise();
      res.status(200).send({ imageUrl: data.Location }); // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading to S3:', error);
      res.status(500).send('Error uploading image');
    }
  });
};

module.exports = { uploadToS3 };
