const express = require("express");
const loanApplicationController = require("../controllers/loanApplicationController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllLoanApplications", validateToken,loanApplicationController.getAllLoanApplications);
router.get("/getLoanApplicationById/:id",validateToken, loanApplicationController.getLoanApplicationById);
router.get("/getLoanApplicationByUserId/:userId",validateToken, loanApplicationController.getLoanApplicationByUserId);
router.post("/addLoanApplication", validateToken,loanApplicationController.addLoanApplication);
router.put("/updateLoanApplication/:id",validateToken, loanApplicationController.updateLoanApplication);
router.delete("/deleteLoanApplication/:id", validateToken,loanApplicationController.deleteLoanApplication);

module.exports = router;
