
const express = require("express");
const loanController = require("../controllers/loanController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.get("/getAllLoans",validateToken,loanController.getAllLoans);
router.get("/getLoanById/:id",validateToken, loanController.getLoanById);
router.post("/addLoan", validateToken,loanController.addLoan);
router.put("/updateLoan/:id",validateToken, loanController.updateLoan);
router.delete("/deleteLoan/:id", validateToken,loanController.deleteLoan);

module.exports = router;
