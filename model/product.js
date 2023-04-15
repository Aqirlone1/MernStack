const mongoose = require('mongoose');
const { Schema } = mongoose;

//schema
const productSchema = new Schema({
  // _id: String,
  title: {type: String, require: true, unique: true},
    description: String,
      price: Number,
      discountPercentage: Number,
      rating: Number,
      brand: String,
      category: String,
      thumbnail: String,
      images: [String]
});

//model
exports.Product  = mongoose.model('Product', productSchema);