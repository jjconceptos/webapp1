import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { productNames } = req.body;
console.log('Received request body (productNames.js): ', productNames);

const furnitureProductNames = [];

for (const productName in productNames) {
  furnitureProductNames.push({ [productName]: productNames[productName] });
}

console.log('Furniture product names (productNames.js): ', furnitureProductNames);


      if (!furnitureProductNames || !Array.isArray(furnitureProductNames)) {
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Replace spaces with hyphens in the product names
const formattedProductNames = furnitureProductNames.map(product => {
  const productName = Object.keys(product)[0]; // Get the product name (key) from the object
  const trimmedName = productName.trim().replace(/\s+/g, '-'); // Trim and replace spaces
  return { [trimmedName]: product[productName] }; // Return the object with the trimmed key and original value
});

// Retrieve the existing product names from the key-value store
let existingFurnitureProductNames = await kv.get('furnitureproductnames:');
if (!existingFurnitureProductNames) {
  existingFurnitureProductNames = [];
}

// Append the new product names to the existing list
const updatedFurnitureProductNames = [...existingFurnitureProductNames, ...formattedProductNames];

console.log('Received product names list (productNames.js): ', formattedProductNames);

// Store the updated product names list
await kv.set('furnitureproductnames:', updatedFurnitureProductNames);

console.log('Furniture product names list updated successfully');

res.status(200).json({ message: "Product names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
