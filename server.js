const express = require('express');
const mongoose = require('mongoose');
const { performance } = require('perf_hooks');
const Product = require('./Product');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://priyanshumandil:Heisenberg%40123@cluster1.ho9mn2h.mongodb.net/FirstDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve static files (index.html and client-side scripts)
app.use(express.static('public'));

// API endpoint for product search
app.get('/products', async (req, res) => {
  const { search } = req.query;

  const query = {
    $or: [
      { tags: { $in: [search] } },
      { category: search },
      { type: search },
    ],
  };

  // Handle price search separately
  if (!isNaN(search)) {
    query.$or.push({ price: parseInt(search) });
  }

  try {
    const startTime = performance.now();
    const products = await Product.find(query);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    res.json({ products, responseTime });
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
