const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('./Product');

mongoose.connect('mongodb+srv://priyanshumandil:Heisenberg%40123@cluster1.ho9mn2h.mongodb.net/FirstDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to generate random products
function generateRandomProducts(numProducts) {
  const products = [];
  const categories = ['Category1', 'Category2', 'Category3'];
  const types = ['Electronics', 'Books', 'Home','Clothing'];

  for (let i = 0; i < numProducts; i++) {
    const product = new Product({
      name: faker.commerce.productName(),
      tags: generateRandomTags(),
      category: categories[Math.floor(Math.random() * categories.length)],
      price: faker.commerce.price(),
      type: types[Math.floor(Math.random() * types.length)],
    });

    products.push(product);
  }

  return products;
}

// Function to generate random tags
function generateRandomTags() {
  const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];
  const numTags = 3;
  const randomTags = new Set();

  while (randomTags.size < numTags) {
    randomTags.add(tags[Math.floor(Math.random() * tags.length)]);
  }

  return [...randomTags];
}

// Populate the database
async function populateDatabase() {
  const products = generateRandomProducts(10000);

  try {
    await Product.insertMany(products);
    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    mongoose.disconnect();
  }
}

populateDatabase();
