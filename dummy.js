
describe('getAllVehicle', () => {
    test('getallvehicle_should_return_with_a_200_status_code', async () => {
      // Sample product data
      const productsData = [
        {
          _id: 'product1',
          vehicleName:'Product 1',
          rentalPrice: 29.99,
          category: 'Clothing',
          description: 'Product 1 description',
          imageurl: 'https://example.com/product1-image.jpg',
          origin: 'Product 1 origin',
          quantity: 5,
          userId: 'user123',
        },
        {
          _id: 'product2',
          vehicleName:'Product 2',
          rentalPrice: 39.99,
          category: 'Electronics',
          description: 'Product 2 description',
          imageurl: 'https://example.com/product2-image.jpg',
          origin: 'Product 2 origin',
          quantity: 10,
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
  
      // Mock the Vehicle.find method to resolve with the sample product data
      const productQuery = {
        sort: jest.fn().mockResolvedValue(productsData), // Mocking the sort function
        exec: jest.fn().mockResolvedValue(productsData), // Mocking the exec function
      };
      Vehicle.find = jest.fn().mockReturnValue(productQuery);
  
      // Call the controller function
      await getAllVehicles(req, res);
  
      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
    });
    test('getallvechiles_should_return_products_and_respond_with_a_200_status_code', async () => {
      // Sample product data
      const productsData = [
        {
          _id: 'product1',
          vehicleName:'Product 1',
          rentalPrice: 29.99,
          category: 'Clothing',
          description: 'Product 1 description',
          imageurl: 'https://example.com/product1-image.jpg',
          origin: 'Product 1 origin',
          quantity: 5,
          userId: 'user123',
        },
        {
          _id: 'product2',
          vehicleName:'Product 2',
          rentalPrice: 39.99,
          category: 'Electronics',
          description: 'Product 2 description',
          imageurl: 'https://example.com/product2-image.jpg',
          origin: 'Product 2 origin',
          quantity: 10,
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
  
      // Mock the Vehicle.find method to resolve with the sample product data
      const productQuery = {
        sort: jest.fn().mockResolvedValue(productsData), // Mocking the sort function
        exec: jest.fn().mockResolvedValue(productsData), // Mocking the exec function
      };
      Vehicle.find = jest.fn().mockReturnValue(productQuery);
  
      // Call the controller function
      await getAllVehicles(req, res);
  
      // Assertions
      expect(Vehicle.find).toHaveBeenCalledWith({ vehicleName:new RegExp('', 'i') });
      expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(productsData);
    });
    test('getallvehicles_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Vehicle.find
      const error = new Error('Database error');
  
      // Mock Express request and response objects
      const req = {
        body: { sortValue: 1, searchValue: '' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.find method to reject with an error
      const productQuery = {
        sort: jest.fn().mockRejectedValue(error), // Mocking the sort function with error
        exec: jest.fn().mockRejectedValue(error), // Mocking the exec function with error
      };
      Vehicle.find = jest.fn().mockReturnValue(productQuery);
  
      // Call the controller function
      await getAllVehicles(req, res);
  
      // Assertions
      expect(Vehicle.find).toHaveBeenCalledWith({ vehicleName:new RegExp('', 'i') });
      expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });

  });
  describe('getVehicleByUserId', () => {
    test('getVehicleByUserId_should_return_products_for_a_valid_user_id_and_respond_with_a_200_status_code', async () => {
      // Sample user ID and product data
      const userId = 'user123';
      const productsData = [
        {
          _id: 'product1',
          vehicleName:'Product 1',
          rentalPrice: 29.99,
          category: 'Clothing',
          description: 'Product 1 description',
          imageurl: 'https://example.com/product1-image.jpg',
          origin: 'Product 1 origin',
          quantity: 5,
          userId: 'user123',
        },
        {
          _id: 'product2',
          vehicleName:'Product 2',
          rentalPrice: 39.99,
          category: 'Electronics',
          description: 'Product 2 description',
          imageurl: 'https://example.com/product2-image.jpg',
          origin: 'Product 2 origin',
          quantity: 10,
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
  
      // Mock the Vehicle.find method to resolve with a query
      const productQuery = {
        sort: jest.fn().mockResolvedValue(productsData), // Mocking the sort function
      };
      Vehicle.find = jest.fn().mockReturnValue(productQuery);
  
      // Call the controller function
      await getVehicleByUserId(req, res);
  
      // Assertions
      expect(Vehicle.find).toHaveBeenCalledWith({ userId: 'user123', vehicleName:new RegExp('', 'i') });
      expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(productsData);
    });
  
    test('getVehicleByUserId_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Vehicle.find
      const error = new Error('Database error');
  
      // Mock Express request and response objects
      const req = {
        body: { userId: 'user123', sortValue: 1, searchValue: '' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.find method to resolve with a query
      const productQuery = {
        sort: jest.fn().mockRejectedValue(error), // Mocking the sort function with error
      };
      Vehicle.find = jest.fn().mockReturnValue(productQuery);
  
      // Call the controller function
      await getVehicleByUserId(req, res);
  
      // Assertions
      expect(Vehicle.find).toHaveBeenCalledWith({ userId: 'user123', vehicleName:new RegExp('', 'i') });
      expect(productQuery.sort).toHaveBeenCalledWith({ rentalPrice: 1 });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
  describe('deleteVehicle', () => {
    test('deleteVehicle_should_delete_a_product_and_respond_with_a_200_status_code_and_success_message', async () => {
      // Sample product ID to be deleted
      const productId = 'product123';
  
      // Mock Express request and response objects
      const req = { params: { id: productId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.findByIdAndDelete method to resolve with the deleted product data
      Vehicle.findByIdAndDelete = jest.fn().mockResolvedValue({
        _id: productId,
        vehicleName:'Deleted Product',
        // Include other fields as needed
      });
  
      // Call the controller function
      await deleteVehicle(req, res);
  
      // Assertions
      expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle deleted successfully' });
    });
  
    test('deleteVehicle_should_handle_not_finding_a_product_and_respond_with_a_404_status_code', async () => {
      // Mock Express request and response objects
      const req = { params: { id: 'nonExistentProduct' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.findByIdAndDelete method to resolve with null (product not found)
      Vehicle.findByIdAndDelete = jest.fn().mockResolvedValue(null);
  
      // Call the controller function
      await deleteVehicle(req, res);
  
      // Assertions
      expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith('nonExistentProduct');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any vehicle' });
    });
  
    test('deleteVehicle_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Vehicle.findByIdAndDelete
      const error = new Error('Database error');
  
      // Mock Express request and response objects
      const req = { params: { id: 'product123' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.findByIdAndDelete method to reject with an error
      Vehicle.findByIdAndDelete = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await deleteVehicle(req, res);
  
      // Assertions
      expect(Vehicle.findByIdAndDelete).toHaveBeenCalledWith('product123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
  describe('updateVehicle', () => {
    test('updateVehicle_should_update_a_product_and_respond_with_a_200_status_code_and_success_message', async () => {
      // Sample product ID and updated product data
      const productId = 'product123';
      const updatedProductData = {
        vehicleName:'Updated Product',
        rentalPrice: 39.99,
        category: 'Electronics',
        description: 'Updated product description',
        imageurl: 'https://example.com/updated-product-image.jpg',
        origin: 'Updated origin',
        quantity: 15,
        userId: 'user789',
      };
  
      // Mock Express request and response objects
      const req = { params: { id: productId }, body: updatedProductData };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.findByIdAndUpdate method to resolve with the updated product data
      Vehicle.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedProductData);
  
      // Call the controller function
      await updateVehicle(req, res);
  
      // Assertions
      expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith(productId, updatedProductData, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle updated successfully' });
    });
  
    test('updateVehicle_should_handle_not_finding_a_product_and_respond_with_a_404_status_code', async () => {
      // Mock Express request and response objects
      const req = { params: { id: 'nonExistentProduct' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.findByIdAndUpdate method to resolve with null (product not found)
      Vehicle.findByIdAndUpdate = jest.fn().mockResolvedValue(null);
  
      // Call the controller function
      await updateVehicle(req, res);
  
      // Assertions
      expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith('nonExistentProduct', {}, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any vehicle' });
    });
  
    test('updateVehicle_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Vehicle.findByIdAndUpdate
      const error = new Error('Database error');
  
      // Mock Express request and response objects
      const req = { params: { id: 'product123' }, body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Mock the Vehicle.findByIdAndUpdate method to reject with an error
      Vehicle.findByIdAndUpdate = jest.fn().mockRejectedValue(error);
  
      // Call the controller function
      await updateVehicle(req, res);
  
      // Assertions
      expect(Vehicle.findByIdAndUpdate).toHaveBeenCalledWith('product123', {}, { new: true });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
  describe('getVehicleById', () => {
    test('getVehicleById_should_return_a_product_with_a_200_status_code', async () => {
      // Sample product ID and corresponding product
      const productId = 'product123';
      const productData = {
        _id: productId,
        vehicleName:'Sample Product',
        rentalPrice: 50.99,
        category: 'Electronics',
        description: 'Sample product description',
        imageurl: 'https://example.com/sample-image.jpg',
        origin: 'Sample origin',
        quantity: 10,
        userId: 'user123',
      };
  
      // Mock the Vehicle.findById method to resolve with the sample product
      Vehicle.findById = jest.fn().mockResolvedValue(productData);
  
      // Mock Express request and response objects
      const req = { params: { id: productId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await getVehicleById(req, res);
  
      // Assertions
      expect(Vehicle.findById).toHaveBeenCalledWith(productId);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    test('getVehicleById_should_return_a_product_with_a_exact_response_object', async () => {
      // Sample product ID and corresponding product
      const productId = 'product123';
      const productData = {
        _id: productId,
        vehicleName:'Sample Product',
        rentalPrice: 50.99,
        category: 'Electronics',
        description: 'Sample product description',
        imageurl: 'https://example.com/sample-image.jpg',
        origin: 'Sample origin',
        quantity: 10,
        userId: 'user123',
      };
  
      // Mock the Vehicle.findById method to resolve with the sample product
      Vehicle.findById = jest.fn().mockResolvedValue(productData);
  
      // Mock Express request and response objects
      const req = { params: { id: productId } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await getVehicleById(req, res);
  
      // Assertions
      expect(Vehicle.findById).toHaveBeenCalledWith(productId);
      expect(res.json).toHaveBeenCalledWith(productData);
    });
    test('getVehicleById_should_return_product_not_found_with_a_200_status_code', async () => {
      // Mock Express request and response objects
      const req = { params: { id: 'nonExistentProduct' } };
  
      // Mock the Vehicle.findById method to resolve with null (product not found)
      Vehicle.findById = jest.fn().mockResolvedValue(null);
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await getVehicleById(req, res);
  
      // Assertions
      expect(Vehicle.findById).toHaveBeenCalledWith('nonExistentProduct');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any vehicle' });
    });
  
    test('getVehicleById_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Vehicle.findById
      const error = new Error('Database error');
  
      // Mock Express request and response objects
      const req = { params: { id: 'product123' } };
  
      // Mock the Vehicle.findById method to reject with an error
      Vehicle.findById = jest.fn().mockRejectedValue(error);
  
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await getVehicleById(req, res);
  
      // Assertions
      expect(Vehicle.findById).toHaveBeenCalledWith('product123');
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  
  });
  describe('addVehicle', () => {
    test('addVehicle_should_add_a_product_and_respond_with_a_200_status_code_and_success_message', async () => {
      // Sample product data to be added
      const productToAdd = {
        vehicleName:'New Product',
        rentalPrice: 29.99,
        category: 'Clothing',
        description: 'New product description',
        imageurl: 'https://example.com/new-product-image.jpg',
        origin: 'New origin',
        quantity: 5,
        userId: 'user456',
      };
  
      // Mock the Vehicle.create method to resolve successfully
      Vehicle.create = jest.fn().mockResolvedValue(productToAdd);
  
      // Mock Express request and response objects
      const req = { body: productToAdd };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await addVehicle(req, res);
  
      // Assertions
      expect(Vehicle.create).toHaveBeenCalledWith(productToAdd);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle added successfully' });
    });
  
    test('addVehicle_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      // Mock an error to be thrown when calling Vehicle.create
      const error = new Error('Database error');
  
      // Mock the Vehicle.create method to reject with an error
      Vehicle.create = jest.fn().mockRejectedValue(error);
  
      // Mock Express request and response objects
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
  
      // Call the controller function
      await addVehicle(req, res);
  
      // Assertions
      expect(Vehicle.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
  
  describe("schema validation for product",()=>{
    test('should_validate_a_product_with_a_negative_price', async () => {
      const invalidProductData = {
        vehicleName:'Sample Product',
        rentalPrice: -10,
        description: 'This is a sample product description.',
        imageurl: 'https://example.com/sample-image.jpg',
        category: 'Electronics',
        origin: 'Sample Origin',
        quantity: 10,
        userId: 'user123',
      };
    
      let a=new Vehicle(invalidProductData);
    
      // Validate the product data against the schema
      await expect(a.validate()).rejects.toThrowError(/is less than minimum allowed value/);
    });
    test('should_validate_a_product_with_a_negative_quantity', async () => {
      const invalidProductData = {
        vehicleName:'Sample Product',
        rentalPrice: 50.99,
        description: 'This is a sample product description.',
        imageurl: 'https://example.com/sample-image.jpg',
        category: 'Electronics',
        origin: 'Sample Origin',
        quantity: -5, // Quantity less than zero
        userId: 'user123',
      };
  
      const Vehicle = new Vehicle(invalidProductData);
  
      // Validate the product data against the schema
      await expect(Vehicle.validate()).rejects.toThrowError(/is less than minimum allowed value/);
    });
    test('should_validate_a_product_with_a_description_longer_than_the_maximum_length', async () => {
      const invalidProductData = {
        vehicleName:'Sample Product',
        rentalPrice: 50.99,
        description: 'This is a sample product description. '.repeat(20), // Create a description longer than the maximum length
        imageurl: 'https://example.com/sample-image.jpg',
        category: 'Electronics',
        origin: 'Sample Origin',
        quantity: 10,
        userId: 'user123',
      };
  
      new Vehicle(invalidProductData);
  
      // Validate the product data against the schema
      await expect(Vehicle.validate()).rejects.toThrowError(/is longer than the maximum allowed length/);
    });
  


})
  describe('validateToken', () => {
   
    test('should_respond_with_400_status_and_error_message_if_invalid_token_is_provided', () => {
      // Mock the req, res, and next objects
      const req = {
        header: jest.fn().mockReturnValue('invalidToken'),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the validateToken function
      validateToken(req, res, next);
  
      // Assertions
      expect(req.header).toHaveBeenCalledWith('Authorization');
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });
  
    test('should_respond_with_400_status_and_error_message_if_no_token_is_provided', () => {
      // Mock the req, res, and next objects
      const req = {
        header: jest.fn().mockReturnValue(null),
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();
  
      // Call the validateToken function
      validateToken(req, res, next);
  
      // Assertions
      expect(req.header).toHaveBeenCalledWith('Authorization');
      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });
  });
  
 