import { Storage } from '@google-cloud/storage';

// Function to initialize the Google Cloud Storage client based on the environment
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
    if (req.method !== 'GET') {
      console.log('Received a non-GET request:', req.method);
      res.status(400).send(`Invalid method: ${req.method}`);
      return;
    }

    // Extract the project names from the query parameters
    const { furnitureProductNames } = req.query;

    // Log the received project names
    console.log('Received request for product names list (getImage.js):', furnitureProductNames);

    // Split the comma-separated project names into an array
    const furnitureProductNamesArray = Array.isArray(furnitureProductNames) ? furnitureProductNames : furnitureProductNames.split(',');

    // Specify the Google Cloud Storage bucket
    const bucketName = 'jj-webapp1';

    // Initialize the Google Cloud Storage client based on the environment
    const storage = initStorage();

    // Create an array to store signed URLs for images
    const signedUrls = [];

    // Iterate over each furniture product name
    for (const furnitureProductName of furnitureProductNamesArray) {
      // Append indexes to the furniture product name to create image filenames
      const imageFileNames = [];
      for (let i = 1; i <= 3; i++) { // Assuming 3 images per product
        imageFileNames.push(`${furnitureProductName}-${i}.jpg`);
      }

      // Create an array of promises to check if the files exist in the bucket
      const filePromises = imageFileNames.map((imageFileName) =>
        storage.bucket(bucketName).file(imageFileName).exists()
      );

      // Check if the files exist in the bucket
      const existsArray = await Promise.all(filePromises);
      const fileExists = existsArray.every((exists) => exists[0]);

      if (!fileExists) {
        console.log(`Images for product ${furnitureProductName} not found in storage`);
        res.status(404).json({ error: `Images for product ${furnitureProductName} not found` });
        return;
      }

      // Get signed URLs for the images to make them publicly accessible
      const productSignedUrls = await Promise.all(
        imageFileNames.map((imageFileName) =>
          storage.bucket(bucketName).file(imageFileName).getSignedUrl({
            action: 'read',
            expires: '01-01-3000', // Adjust the expiration as needed
          })
        )
      );

      // Push the signed URLs for the current product to the array
      signedUrls.push(...productSignedUrls);
    }

    // Log the signedUrls array
    console.log('Retrieved signed URLs:', signedUrls);

    // Respond with the signed URLs to the client
    res.status(200).json({ signedUrls });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('Image fetch error: ' + error.message);
  }
}
