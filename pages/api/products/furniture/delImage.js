import { Storage } from '@google-cloud/storage';

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

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      console.log('Received a non-POST request:', req.method);
      res.status(400).send(`Invalid method: ${req.method}`);
      return;
    }

    console.log('Received a POST request to /api/products/delImage');
    console.log('Request body:', req.body);

    // Extract image URL from the request
    const imageUrl = req.body.imageUrl;
    console.log("Image URL (delImage.js): ", imageUrl);

    // Check if image URL is missing
    if (!imageUrl) {
      console.log('Validation failed: Missing image URL');
      return res.status(400).json({ error: 'Image URL is required' });
    }

    // Extract furniture product name from the image URL
    const furnitureProductName = imageUrl.split('-').slice(0, -1).join('-');
    console.log("Furniture Product Name (delImage.js): ", furnitureProductName);

    // Specify the Google Cloud Storage bucket and image filename
    const bucketName = 'jj-webapp1';
    const imageFileName = `${imageUrl}`; 

    console.log('Deleting image from Google Cloud Storage:', imageFileName);

    // Initialize Google Cloud Storage based on the environment
    const dynamicStorage = initStorage();

    // Get the bucket and file objects using the dynamic storage instance
    const bucket = dynamicStorage.bucket(bucketName);
    const file = bucket.file(imageFileName);

    // Check if the file exists
    const exists = await file.exists();
    if (!exists[0]) {
      console.log('Image not found:', imageFileName);
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the image from Google Cloud Storage
    await file.delete();

    console.log('Image deleted from Google Cloud Storage:', imageFileName);

    // Respond with a success message
    res.status(200).json('Image deleted successfully');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('Image deletion error: ' + error.message);
  }
}
