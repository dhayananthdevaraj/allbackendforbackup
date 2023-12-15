const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Remove leading and trailing whitespaces
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000, // Maximum description length
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
    min: 1, // Minimum page count should be 1
  },
  availableCopies: {
    type: Number,
    required: true,
    min: 0, // Minimum available copies should be 0
  },
  userId: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
