const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est requis !"]
    },
    desc: {
      type: String,
      required: [true, "Le produit est requis"],
      minlength: [10, "Le produit doit contenir au moins 10 caractères"]
    },
    image: {
      type: String,
      required: [true, "L'image est requise"]
    },
    userId: {
      // Permet de référencer d'autres documents, provenant
      // d'autres collections
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
