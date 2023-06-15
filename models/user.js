const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      validate: {
        validator: function(value) {
          return emailRegex.test(value);
        },
        message: 'Adresse e-mail invalide'
      }
    },
    city: {
      type: String,
      required: true,
      maxlength: 50
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
