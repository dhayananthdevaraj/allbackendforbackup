const Book = require('../models/bookModel');

const getAllBooks = async (req, res) => {
  try {
    console.log("req.body",req.body);
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex
console.log("search",search);
    const books = await Book.find({ title: searchRegex })
      .sort({ publicationYear: parseInt(sortValue) });
console.log("books",books);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      res.status(200).json({ message: 'Cannot find any book' });
      return;
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(200).json({ message: 'Book added successfully' });
  } catch (error) {
    console.log({error: error.message});
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true });

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getBooksByUserId = async (req, res) => {
  try {
    const sortValue = req.body.sortValue || 1; // Default to ascending order if not provided
    const search = req.body.searchValue || ''; // Default to empty string if not provided
    const searchRegex = new RegExp(search, 'i'); // Case-insensitive search regex

    const { userId } = req.body;

    const books = await Book.find({ userId, title: searchRegex })
      .sort({ publicationYear: parseInt(sortValue) });

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
  getBooksByUserId
};
