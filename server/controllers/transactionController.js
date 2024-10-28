// controllers/transactionController.js
const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  const { type, amount, category } = req.body;
  try {
    const transaction = new Transaction({ userId: req.user.userId, type, amount, category });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
