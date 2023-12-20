const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
  },
  userName: {
    type: String,
    required: [true, 'User name is required'],
  },
  loanType: {
    type: String,
    required: [true, 'Loan type is required'],
  },
  submissionDate: {
    type: Date,
    required: [true, 'Submission date is required'],
  },
  income: {
    type: Number,
    required: [true, 'Income is required'],
  },
  model: {
    type: Date,
    required: [true, 'Model is required'],
  },
  purchasePrice: {
    type: Number,
    required: [true, 'Purchase price is required'],
  },
  loanStatus: {
    type: Number,
    required: [true, 'Loan status is required'],
    default: 1,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  file: {
    type: String,
    required: [true, 'File is required'],
  },
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

module.exports = LoanApplication;
