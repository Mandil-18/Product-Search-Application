const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  tags: {
    type:[String],
    index:true
  },
  category: String,
  price: Number,
  type: String
});

module.exports = mongoose.model('Product', productSchema);
