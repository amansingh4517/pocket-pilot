import Transaction from '../models/transaction.js';
import { TRANSACTION_TYPES } from '../utils/constants.js';
import mongoose from 'mongoose';

// @desc    Get financial summary (income, expenses, savings)
// @route   GET /api/dashboard/summary
// @access  Private
export const getSummary = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);;

        // Calculate total income
        const incomeResult = await Transaction.aggregate([ //Mongoose aggregation pipeline — allows you to run multiple operations in stages.
            { $match: { userId: userId, type: TRANSACTION_TYPES.INCOME } }, //Filters documents by conditions (userId and type: INCOME).
            { $group: { _id: null, total: { $sum: '$amount' } } } //Groups the filtered documents — _id: null means “group all together.”
        ]);

        const totalIncome = incomeResult[0]?.total || 0;

        // Calculate total expenses
        const expenseResult = await Transaction.aggregate([
            { $match: { userId: userId, type: TRANSACTION_TYPES.EXPENSE } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalExpenses = expenseResult[0]?.total || 0;

        // Calculate savings
        const savings = totalIncome - totalExpenses;

        // Get transaction counts
        const incomeCount = await Transaction.countDocuments({ //Mongoose method to count how many documents match a filter.
            userId,
            type: TRANSACTION_TYPES.INCOME
        });
        const expenseCount = await Transaction.countDocuments({
            userId,
            type: TRANSACTION_TYPES.EXPENSE
        });

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpenses,
                savings,
                incomeCount,
                expenseCount,
                totalTransactions: incomeCount + expenseCount
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// @desc    Get expenses grouped by category
// @route   GET /api/dashboard/by-category
// @access  Private
export const getByCategory = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.id);
        
        const categoryData = await Transaction.aggregate([
            { $match: { userId: userId, type: TRANSACTION_TYPES.EXPENSE } },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 },
                    avgAmounbt: { $avg: '$amount' }
                }
            },
            { $sort: { total: -1 } } // Sort by highest spending first
        ]);


        // Calculate percentage of total expenses
        const totalExpenses = categoryData.reduce((sum, cat) => sum + cat.total, 0); //reduce() is a JavaScript array method used to combine all elements of an array into a single value (like sum, average, product, etc.).

        
        const enrichedCategoryData = categoryData.map(cat => ({
            category: cat._id,
            total: cat.total,
            count: cat.count,
            avgAmount: Math.round(cat.avgAmount * 100) / 100,
            percentage: totalExpenses > 0
                ? Math.round((cat.total / totalExpenses) * 100 * 10) / 10
                : 0

        }));

        res.status(200).json({
            success: true,
            count: enrichedCategoryData.length,
            data: enrichedCategoryData
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// @desc    Get recent transactions
// @route   GET /api/dashboard/recent
// @access  Private
export const getRecent = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 5; // Get limit from query params (user) or default to 5

        const recentTransactions = await Transaction.find({ userId: req.user.id }) //get transactions for logged-in user
            .sort({ date: -1, createdAt: -1 }) // Sort by date descending (most recent first)
            .limit(limit); //take only 'limit' number of transactions

        res.status(200).json({
            success: true,
            count: recentTransactions.length,
            data: recentTransactions
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// @desc    Get satisfaction analysis (for expenses)
// @route   GET /api/dashboard/satisfaction
// @access  Private
export const getSatisfactionAnalysis = async (req, res) => {
    try {

        const userId = new mongoose.Types.ObjectId(req.user.id);

        const satisfactionData = await Transaction.aggregate([
            {
                $match: {
                    userId: userId,
                    type: TRANSACTION_TYPES.EXPENSE,
                    satisfaction: { $exists: true, $ne: null } //only consider transactions with satisfaction field
                }
            },
            {
                $group: {
                    _id: '$satisfaction',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } } // Sort by satisfaction rating ascending  
        ]);
        

        res.status(200).json({
            success: true,
            data: satisfactionData.map(item => ({
                satisfaction: item._id,
                total: item.total,
                count: item.count
            }))
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 