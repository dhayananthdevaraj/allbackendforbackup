// const { getVehicleById, addVehicle, getVehicleByUserId, deleteVehicle, updateVehicle, getAllVehicles } = require("../controllers/vehicleController");
const { getUserByUsernameAndPassword, getAllUsers, addUser } = require("../controllers/userController");
// const Vehicle = require("../models/vehicleModel");
const User = require("../models/userModel");
const { validateToken } = require('../authUtils');
const Book = require("../models/bookModel");
const { getAllBooks, getBooksByUserId, updateBook, deleteBook, getBookById, addBook } = require("../controllers/bookController");

describe('getUserByUsernameAndPassword', () => {
  test('getuserbyusernameandpassword_should_return_invalid_credentials_with_a_200_status_code', async () => {
    // Sample user credentials
    const userCredentials = {
      email: 'nonexistent@example.com',
      password: 'incorrect_password',
    };

    // Mock Express request and response objects
    const req = {
      body: userCredentials,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne method to resolve with null (user not found)
    User.findOne = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await getUserByUsernameAndPassword(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith(userCredentials);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid Credentials' });
  });

  test('getuserbyusernameandpassword_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.findOne
    const error = new Error('Database error');

    // Sample user credentials
    const userCredentials = {
      email: 'john@example.com',
      password: 'password123',
    };

    // Mock Express request and response objects
    const req = {
      body: userCredentials,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.findOne method to reject with an error
    User.findOne = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await getUserByUsernameAndPassword(req, res);

    // Assertions
    expect(User.findOne).toHaveBeenCalledWith(userCredentials);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('addUser', () => {
  test('adduser_should_add_user_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample user data
    const userData = {
      username: 'john_doe',
      email: 'john@example.com',
      password: 'password123',
    };

    // Mock Express request and response objects
    const req = {
      body: userData,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.create method to resolve with the sample user data
    User.create = jest.fn().mockResolvedValue(userData);

    // Call the controller function
    await addUser(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(userData);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Success' });
  });

  test('adduser_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.create
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: {},
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.create method to reject with an error
    User.create = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await addUser(req, res);

    // Assertions
    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});

describe('getAllUsers', () => {
  test('getallusers_should_return_users_and_respond_with_a_200_status_code', async () => {
    // Sample user data
    const usersData = [
      {
        _id: 'user1',
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password1',
      },
      {
        _id: 'user2',
        username: 'jane_doe',
        email: 'jane@example.com',
        password: 'hashed_password2',
      },
    ];

    // Mock Express request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.find method to resolve with the sample user data
    User.find = jest.fn().mockResolvedValue(usersData);

    // Call the controller function
    await getAllUsers(req, res);

    // Assertions
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usersData);
  });

  test('getallusers_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling User.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the User.find method to reject with an error
    User.find = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await getAllUsers(req, res);

    // Assertions
    expect(User.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('User Model Schema Validation', () => {
  test('should_validate_a_user_with_valid_data', async () => {
    const validUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(validUserData);

    // Validate the user data against the schema
    await expect(user.validate()).resolves.toBeUndefined();
  });

  test('should_validate_a_user_with_missing_required_fields', async () => {
    const invalidUserData = {
      // Missing required fields
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError();
  });

  test('should_validate_a_user_with_invalid_mobile_number_format', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: 'not-a-number',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is not a valid mobile number/);
  });

  test('should_validate_a_user_with_invalid_email_format', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'invalid-email',
      role: 'user',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is not a valid email address/);
  });

  test('should_validate_a_user_with_a_password_shorter_than_the_minimum_length', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'short',
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is shorter than the minimum allowed length/);
  });

  test('should_validate_a_user_with_a password_longer_than_the_maximum_length', async () => {
    const invalidUserData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '1234567890',
      email: 'john.doe@example.com',
      role: 'user',
      password: 'a'.repeat(256),
    };

    const user = new User(invalidUserData);

    // Validate the user data against the schema
    await expect(user.validate()).rejects.toThrowError(/is longer than the maximum allowed length /);
  });
});

describe('getAllBooks', () => {
  test('get_all_books_should_return_with_a_200_status_code', async () => {
    // Sample book data
    const booksData = [
      {
        _id: 'book1',
        title: 'Book 1',
        genre: 'Fiction',
        description: 'Book 1 description',
        publicationYear: 2022,
        pageCount: 300,
        availableCopies: 5,
        userId: 'user123',
      },
      {
        _id: 'book2',
        title: 'Book 2',
        genre: 'Non-fiction',
        description: 'Book 2 description',
        publicationYear: 2021,
        pageCount: 250,
        availableCopies: 10,
        userId: 'user456',
      },
    ];

    // Mock Express request and response objects
    const req = {
      body: { sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.find method to resolve with the sample book data
    const bookQuery = {
      sort: jest.fn().mockResolvedValue(booksData),
      exec: jest.fn().mockResolvedValue(booksData),
    };
    Book.find = jest.fn().mockReturnValue(bookQuery);

    // Call the controller function
    await getAllBooks(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('get_all_books_should_return_books_and_respond_with_a_200_status_code', async () => {
    // Sample book data
    const booksData = [
      {
        _id: 'book1',
        title: 'Book 1',
        genre: 'Fiction',
        description: 'Book 1 description',
        publicationYear: 2022,
        pageCount: 300,
        availableCopies: 5,
        userId: 'user123',
      },
      {
        _id: 'book2',
        title: 'Book 2',
        genre: 'Non-fiction',
        description: 'Book 2 description',
        publicationYear: 2021,
        pageCount: 250,
        availableCopies: 10,
        userId: 'user456',
      },
    ];

    // Mock Express request and response objects
    const req = {
      body: { sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.find method to resolve with the sample book data
    const bookQuery = {
      sort: jest.fn().mockResolvedValue(booksData),
    };
    Book.find = jest.fn().mockReturnValue(bookQuery);

    // Call the controller function
    await getAllBooks(req, res);

    // Assertions
    expect(Book.find).toHaveBeenCalledWith({ title: new RegExp('', 'i') });
    expect(bookQuery.sort).toHaveBeenCalledWith({ publicationYear: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(booksData);
  });

  test('get_all_books_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Book.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: { sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.find method to reject with an error
    const bookQuery = {
      sort: jest.fn().mockRejectedValue(error)
    };
    Book.find = jest.fn().mockReturnValue(bookQuery);

    // Call the controller function
    await getAllBooks(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('getBookByUserId', () => {
  test('get_book_by_user_id_should_return_books_for_a_valid_user_id_and_respond_with_a_200_status_code', async () => {
    // Sample user ID and book data
    const userId = 'user123';
    const booksData = [
      {
        _id: 'book1',
        title: 'Book 1',
        genre: 'Fiction',
        description: 'Book 1 description',
        publicationYear: 2022,
        pageCount: 300,
        availableCopies: 5,
        userId: 'user123',
      },
      {
        _id: 'book2',
        title: 'Book 2',
        genre: 'Non-fiction',
        description: 'Book 2 description',
        publicationYear: 2021,
        pageCount: 250,
        availableCopies: 10,
        userId: 'user123',
      },
    ];

    // Mock Express request and response objects
    const req = {
      body: { userId, sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.find method to resolve with a query
    const bookQuery = {
      sort: jest.fn().mockResolvedValue(booksData), // Mocking the sort function
    };
    Book.find = jest.fn().mockReturnValue(bookQuery);

    // Call the controller function
    await getBooksByUserId(req, res);

    // Assertions
    expect(Book.find).toHaveBeenCalledWith({ userId: 'user123', title: new RegExp('', 'i') });
    expect(bookQuery.sort).toHaveBeenCalledWith({ publicationYear: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(booksData);
  });

  test('get_book_by_user_id_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Book.find
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = {
      body: { userId: 'user123', sortValue: 1, searchValue: '' },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.find method to resolve with a query
    const bookQuery = {
      sort: jest.fn().mockRejectedValue(error), // Mocking the sort function with error
    };
    Book.find = jest.fn().mockReturnValue(bookQuery);

    // Call the controller function
    await getBooksByUserId(req, res);

    // Assertions
    expect(Book.find).toHaveBeenCalledWith({ userId: 'user123', title: new RegExp('', 'i') });
    expect(bookQuery.sort).toHaveBeenCalledWith({ publicationYear: 1 });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('deleteBook', () => {
  test('delete_book_should_delete_a_book_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample book ID to be deleted
    const bookId = 'book123';

    // Mock Express request and response objects
    const req = { params: { id: bookId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.findByIdAndDelete method to resolve with the deleted book data
    Book.findByIdAndDelete = jest.fn().mockResolvedValue({
      _id: bookId,
      title: 'Deleted Book',
      // Include other fields as needed
    });

    // Call the controller function
    await deleteBook(req, res);

    // Assertions
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith(bookId);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book deleted successfully' });
  });

  test('delete_book_should_handle_not_finding_a_book_and_respond_with_a_404_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: 'nonExistentBook' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.findByIdAndDelete method to resolve with null (book not found)
    Book.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await deleteBook(req, res);

    // Assertions
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('nonExistentBook');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });

  test('delete_book_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Book.findByIdAndDelete
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: 'book123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.findByIdAndDelete method to reject with an error
    Book.findByIdAndDelete = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await deleteBook(req, res);

    // Assertions
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith('book123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('updateBook', () => {
  test('update_book_should_update_a_book_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample book ID and updated book data
    const bookId = 'book123';
    const updatedBookData = {
      title: 'Updated Book',
      genre: 'Fiction',
      description: 'Updated book description',
      publicationYear: 2023,
      pageCount: 200,
      availableCopies: 20,
      userId: 'user789',
    };

    // Mock Express request and response objects
    const req = { params: { id: bookId }, body: updatedBookData };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.findByIdAndUpdate method to resolve with the updated book data
    Book.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBookData);

    // Call the controller function
    await updateBook(req, res);

    // Assertions
    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(bookId, updatedBookData, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book updated successfully' });
  });

  test('update_book_should_handle_not_finding_a_book_and_respond_with_a_404_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: 'nonExistentBook' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.findByIdAndUpdate method to resolve with null (book not found)
    Book.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

    // Call the controller function
    await updateBook(req, res);

    // Assertions
    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('nonExistentBook', {}, { new: true });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book not found' });
  });

  test('update_book_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Book.findByIdAndUpdate
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: 'book123' }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock the Book.findByIdAndUpdate method to reject with an error
    Book.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

    // Call the controller function
    await updateBook(req, res);

    // Assertions
    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith('book123', {}, { new: true });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('getBookById', () => {
  test('get_book_by_id_should_return_a_book_with_a_200_status_code', async () => {
    // Sample book ID and corresponding book
    const bookId = 'book123';
    const bookData = {
      _id: bookId,
      title: 'Sample Book',
      genre: 'Fiction',
      description: 'Sample book description',
      publicationYear: 2022,
      pageCount: 300,
      availableCopies: 15,
      userId: 'user123',
    };

    // Mock the Book.findById method to resolve with the sample book
    Book.findById = jest.fn().mockResolvedValue(bookData);

    // Mock Express request and response objects
    const req = { params: { id: bookId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getBookById(req, res);

    // Assertions
    expect(Book.findById).toHaveBeenCalledWith(bookId);
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('get_book_by_id_should_return_a_book_with_an_exact_response_object', async () => {
    // Sample book ID and corresponding book
    const bookId = 'book123';
    const bookData = {
      _id: bookId,
      title: 'Sample Book',
      genre: 'Fiction',
      description: 'Sample book description',
      publicationYear: 2022,
      pageCount: 300,
      availableCopies: 15,
      userId: 'user123',
    };

    // Mock the Book.findById method to resolve with the sample book
    Book.findById = jest.fn().mockResolvedValue(bookData);

    // Mock Express request and response objects
    const req = { params: { id: bookId } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getBookById(req, res);

    // Assertions
    expect(Book.findById).toHaveBeenCalledWith(bookId);
    expect(res.json).toHaveBeenCalledWith(bookData);
  });

  test('get_book_by_id_should_return_book_not_found_with_a_200_status_code', async () => {
    // Mock Express request and response objects
    const req = { params: { id: 'nonExistentBook' } };

    // Mock the Book.findById method to resolve with null (book not found)
    Book.findById = jest.fn().mockResolvedValue(null);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getBookById(req, res);

    // Assertions
    expect(Book.findById).toHaveBeenCalledWith('nonExistentBook');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any book' });
  });

  test('get_book_by_id_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Book.findById
    const error = new Error('Database error');

    // Mock Express request and response objects
    const req = { params: { id: 'book123' } };

    // Mock the Book.findById method to reject with an error
    Book.findById = jest.fn().mockRejectedValue(error);

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await getBookById(req, res);

    // Assertions
    expect(Book.findById).toHaveBeenCalledWith('book123');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('addBook', () => {
  test('add_book_should_add_a_book_and_respond_with_a_200_status_code_and_success_message', async () => {
    // Sample book data to be added
    const bookToAdd = {
      title: 'New Book',
      genre: 'Fantasy',
      description: 'New book description',
      publicationYear: 2023,
      pageCount: 350,
      availableCopies: 10,
      userId: 'user789',
    };

    // Mock the Book.create method to resolve successfully
    Book.create = jest.fn().mockResolvedValue(bookToAdd);

    // Mock Express request and response objects
    const req = { body: bookToAdd };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await addBook(req, res);

    // Assertions
    expect(Book.create).toHaveBeenCalledWith(bookToAdd);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Book added successfully' });
  });

  test('add_book_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
    // Mock an error to be thrown when calling Book.create
    const error = new Error('Database error');

    // Mock the Book.create method to reject with an error
    Book.create = jest.fn().mockRejectedValue(error);

    // Mock Express request and response objects
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller function
    await addBook(req, res);

    // Assertions
    expect(Book.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
  });
});
describe('Book_Schema_Validation', () => {
  test('should_be_valid_book_with_correct_data', async () => {
    const validBookData = {
      title: 'Sample Book',
      genre: 'Fiction',
      description: 'A sample book description.',
      publicationYear: 2022,
      pageCount: 300,
      availableCopies: 10,
      userId: 'user123',
    };

    const validBook = new Book(validBookData);

    await expect(validBook.validate()).resolves.not.toThrow();
  });

  test('should_throw_validation_error_for_missing_required_fields', async () => {
    const bookWithMissingFields = new Book({});

    await expect(bookWithMissingFields.validate()).rejects.toThrow();
  });

  test('should_throw_validation_error_for_invalid_publication_year', async () => {
    const bookWithInvalidPublicationYear = new Book({
      title: 'Invalid Book',
      genre: 'Non-Fiction',
      description: 'An invalid book description.',
      publicationYear: 'InvalidYear',
      pageCount: 150,
      availableCopies: 5,
      userId: 'user456',
    });

    await expect(bookWithInvalidPublicationYear.validate()).rejects.toThrow();
  });

  // Add more test cases for other validations as needed
});