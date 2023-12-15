const express = require("express");
const productController = require("../controllers/bookController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllBooks",validateToken,productController.getAllBooks);
router.post("/getBooksByUserId", validateToken,productController.getBooksByUserId);
router.get("/getBookById/:id",validateToken,productController.getBookById);
router.post("/addBook",validateToken,productController.addBook);
router.put("/updateBook/:id",validateToken, productController.updateBook);
router.delete("/deleteBook/:id", validateToken,productController.deleteBook);

module.exports = router;
