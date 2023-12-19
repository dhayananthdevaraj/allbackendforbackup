const express = require("express");
const loanApplicationController = require("../controllers/loanApplicationController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllLoanApplications",loanApplicationController.getAllLoanApplications);
router.get("/getLoanApplicationById/:id" , loanApplicationController.getLoanApplicationById);
router.get("/getLoanApplicationsByUserId/:userId" , loanApplicationController.getLoanApplicationsByUserId);
router.post("/addLoanApplication",loanApplicationController.addLoanApplication);
router.put("/updateLoanApplication/:id" , loanApplicationController.updateLoanApplication);
router.delete("/deleteLoanApplication/:id", validateToken,loanApplicationController.deleteLoanApplication);

module.exports = router;
