import { Storage } from '@google-cloud/storage';
import multer from 'multer';

// Initialize the Google Cloud Storage client
const storage = new Storage();

// Create a Multer instance for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory for processing
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to initialize Google Cloud Storage based on the environment
const initStorage = () => {
  if (process.env.VERCEL_ENV === 'production') {
    // Use environment variable for credentials in production
    return new Storage({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    });
  } else {
    // Use local JSON file for credentials in development
    return new Storage({
      keyFilename: './primeval-array-411517-a6421345dc48.json',
    });
  }
};

// Define your API route handler for Google Cloud Storage uploads
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      console.log('Received a non-POST request:', req.method);
      res.status(400).send(`Invalid method: ${req.method}`);
      return;
    }

    console.log('Received a POST request to /api/products/furniture/productImage');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);

    // Use the "upload" Multer middleware to handle file uploads
    upload.array('photos', 3)(req, res, async function (err) {
      if (err) {
        // Handle any Multer errors here
        console.error('Multer error:', err);
        return res.status(500).json('File upload error: ' + err.message);
      }

      // Log the received request and file details
      console.log('Received file upload request:');
      console.log('Uploaded files:', req.files); // Log the uploaded files array

      // Validate that files were uploaded
      if (!req.files || req.files.length === 0) {
        console.log('Validation failed: Missing photos');
        return res.status(400).json({ error: 'Photos are required' });
      }

      // Extract product name and timestamp
      let productName = req.headers['image-name'];

      // Replace spaces with hyphens in the product name
      productName = productName.trim().replace(/\s+/g, '-');

      // Initialize Google Cloud Storage based on the environment
      const dynamicStorage = initStorage();

      // Upload each file to Google Cloud Storage using the dynamic storage instance
      const bucketName = 'jj-webapp1';
      const bucket = dynamicStorage.bucket(bucketName);

      // Save each file individually
      const uploadPromises = req.files.map(async (file, index) => {
        // Construct destination filename with modified product name, index, and timestamp
        const destFileName = `${productName}-${index + 1}.jpg`; // Assuming it's a JPEG image
        console.log('Uploading photo to Google Cloud Storage:', destFileName);

        // Save the file to Google Cloud Storage
        const fileBuffer = file.buffer;
        const newFile = bucket.file(destFileName);

        await newFile.save(fileBuffer, {
          metadata: {
            contentType: file.mimetype,
          },
        });

        console.log('Image data processing completed for', destFileName);
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      // Respond with a success message
      res.status(200).json('File uploads complete');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('File upload error: ' + error.message);
  }
}
