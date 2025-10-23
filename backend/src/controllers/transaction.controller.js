import Transaction from '../models/transaction.js';

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res) => {
    try {
        const { userID, amount, type, category, purpose, satisfaction, date } = req.body;

        // Create transaction with logged-in user's ID
        const transaction = await Transaction.create({
            userId: req.user.id,
            amount,
            type,
            category,
            purpose,
            satisfaction,
            date: date || Date.now()
        });

        res.status(201).json({
            success: true,
            message: 'Transaction created successfully',
            data: transaction
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 }); // Sort by date, newest first

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        // Check if transaction exists
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Make sure user owns this transaction
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this transaction'
            });
        }

        res.status(200).json({
            success: true,
            data: transaction
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res) => {
    try {
        let transaction = await Transaction.findById(req.params.id);

        // Check if transaction exists
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Make sure user owns this transaction
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this transaction'
            });
        }

        // Update transaction
        transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true, // Return updated document
                runValidators: true// Run model validations
            }
        );
        res.status(200).json({
            success: true,
            message: 'Transaction updated successfully',
            data: transaction
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        // Check if transaction exists
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found'
            });
        }

        // Make sure user owns this transaction
        if (transaction.userId.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this transaction'
            });
        }

        await transaction.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Transaction deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};