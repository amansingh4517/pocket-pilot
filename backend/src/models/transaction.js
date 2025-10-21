import mongoose from 'mongoose';
import { CATEGORIES, TRANSACTION_TYPES, SATISFACTION_LEVELS } from '../utils/constants.js';

// Define the structure of transaction data (transaction schema)
export const transactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: [true, 'Provide an amount'],
            min: [0.01, 'Amount must be greater than 0']
        },
        type: {
            type: String,
            required: [true, 'Provide transaction type'],
            enum: {
                values: [TRANSACTION_TYPES.INCOME, TRANSACTION_TYPES.EXPENSE],
                message: 'Type must be either income or expense'
            }
        },
        category: {
            type: String,
            enum: {
                values: CATEGORIES,
                message: 'Please select valid category'
            }
        },
        purpose: {
            type: String,
            trim: true,
            maxLength: [200, 'Purpose cannot exceed 200 characters']
        },
        satisfaction: {
            type: String,
            enum: {
                values: Object.values(SATISFACTION_LEVELS),
                message: 'Please select valid satisfaction level',
                // Only for expenses
                validate: {
                    validator: function (value) {
                        // Satisfaction is optional, but if provided, must be for expenses
                        if (value && this.type === TRANSACTION_TYPES.INCOME) {
                            return false;
                        }
                        return true;
                    },
                    message: 'Satisfaction level can only be set for expenses'
                },
            }
        },

        date: {
            type: Date,
            required: [true, 'Provide transaction date'],
            default: Date.now
        }
    },
    { timestamps: true }
);

// Index for faster queries
transactionSchema.index({ userId: 1, date: -1 });
transactionSchema.index({ userId: 1, category: 1 });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
