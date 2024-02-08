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

    // Use the "upload" Multer middleware to handle file uploads
    upload.array('photos', 3)(req, res, async function (err) {
      if (err) {
        // Handle any Multer errors here
        console.error('Multer error:', err);
        return res.status(500).json('File upload error: ' + err.message);
      }

      // Log the received request and file details
      console.log('Received file upload request:');
      console.log('Uploaded files:', req.files); // Log the uploaded files details

      // Validate that files were uploaded
      if (!req.files || req.files.length === 0) {
        console.log('Validation failed: No photos uploaded');
        return res.status(400).json({ error: 'Photos are required' });
      }

      // Process each uploaded file
      for (const file of req.files) {
        // Transform the product name to replace spaces with hyphens and handle special characters
        let furnitureProductName = req.headers['image-name'];
        furnitureProductName = furnitureProductName.trim().replace(/\s+/g, '-'); // Replace spaces with hyphens
        furnitureProductName = encodeURIComponent(furnitureProductName); // Encode special characters

        // Specify the Google Cloud Storage bucket and destination filename
        const bucketName = 'jj-webapp1';
        const destFileName = `${furnitureProductName}-${Date.now()}-${file.originalname}`; // Append timestamp to filename
        console.log('Uploading photo to Google Cloud Storage:', destFileName);

        // Initialize Google Cloud Storage based on the environment
        const dynamicStorage = initStorage();

        // Upload the file to Google Cloud Storage using the dynamic storage instance
        const bucket = dynamicStorage.bucket(bucketName);
        const gcsFile = bucket.file(destFileName);

        await gcsFile.save(file.buffer, {
          metadata: {
            contentType: file.mimetype,
          },
        });

        console.log('Image data processing completed for:', destFileName);
      }

      // Respond with a success message
      res.status(200).json('File upload complete');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('File upload error: ' + error.message);
  }
}
