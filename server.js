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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// API endpoint for product search
app.get('/products', async (req, res, next) => {
  const { search } = req.query;

  const query = {
    $or: [
      { tags: { $regex: new RegExp(search, 'i') } },
      { category: { $regex: new RegExp(search, 'i') } },
      { type: { $regex: new RegExp(search, 'i') } },
    ],
  };

  const numericRegex = /^[0-9]+$/;
  if (numericRegex.test(search)) {
    query.$or.push({ price: parseInt(search) });
  }

  try {
    const startTime = performance.now();
    const products = await Product.find(query).select('name price category type').limit(50).lean();
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    res.json({ products, responseTime });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
