const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  loanType: {
    type: String,
    required: [true, 'Loan type is required'],
    index: 'text',
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  interestRate: {
    type: Number,
    required: [true, 'Interest rate is required'],
  },
  maximumAmount: {
    type: Number,
    required: [true, 'Maximum amount is required'],
  },
});

const Loan = mongoose.model('loan', loanSchema);

module.exports = Loan;
