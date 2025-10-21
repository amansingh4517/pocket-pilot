import { Router } from 'express';
import {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
} from '../controllers/transaction.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const transactionRouter = Router();

// All transaction routes are protected (require login)
transactionRouter.use(protect);

// Routes
transactionRouter.route('/')
    .get(getTransactions)  // GET /api/transactions
    .post(createTransaction);  // POST /api/transactions

transactionRouter.route('/:id')
    .get(getTransaction)  // GET /api/transactions/:id;
    .put(updateTransaction)  // PUT /api/transactions/:id
    .delete(deleteTransaction);  // DELETE /api/transactions/:id


export default transactionRouter;


