const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis !'],
      maxlength: [50, 'Le titre ne peut pas dépasser 50 caractères']
    },
    description: {
      type: String,
      required: [true, 'La description est requise'],
      maxlength: [255, 'La description ne peut pas dépasser 255 caractères']
    },
    price: {
      type: Number,
      required: true
    },
    imageUrl: {
      type: [String],
      required: true
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    isSold: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
