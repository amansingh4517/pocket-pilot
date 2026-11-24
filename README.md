# PocketPilot — Student Finance Tracker

PocketPilot helps students track pocket money, see where it goes, and reflect on how purchases felt. The React frontend lives in `frontend/` and uses the Express and MongoDB API in `backend/`.

## Run locally

Use Node.js 22 or newer, npm, and a running MongoDB instance. Start both services from the repository root in separate terminals.

### 1. Start the API

Create `backend/.env` with the following settings. Substitute your MongoDB connection string and a randomly generated secret.

```dotenv
MONGO_URI=mongodb://127.0.0.1:27017/pocketpilot
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRE=7d
PORT=5000
```

```sh
cd backend
npm ci
npm run dev
```

Open [the API health endpoint](http://localhost:5000/) to check that Express is running. The terminal should also report a successful MongoDB connection.

### 2. Start the frontend

```sh
cd frontend
npm ci
npm run dev
```

Open the local URL printed by Vite, usually [localhost:5173](http://localhost:5173/). Choose **Create an account**, then **Add transaction** to record your first income or expense.

Vite forwards requests under `/api` to `http://127.0.0.1:5000`. If the API runs elsewhere, set `API_TARGET` in `frontend/.env.local` to its origin and restart Vite.

## Using PocketPilot

- **Overview** shows savings, total income, total expenses, spending by category, purchase satisfaction, and the five most recent transactions.
- **Transactions** lets you search by purpose and filter by type and category. Select a transaction to edit it or confirm deletion.
- **Expense ratings** are optional. Choose Happy, Neutral, or Regret to include an expense in the satisfaction breakdown.
- **Accounts** use a bearer token stored in the current browser tab’s session storage. Signing out clears it.

The interface displays amounts in Indian rupees (₹). The backend stores numeric amounts without a currency field.

## Build and preview

From `frontend/`, run:

```sh
npm run build
npm run preview
```

The build is written to `frontend/dist/`. Preview uses the same API proxy as development. For production, serve the built files and route `/api/*` on the same origin to Express.

## 📚 API Overview

The API exposes 12 endpoints under the three route groups below. Login and registration are public. All other endpoints require an `Authorization: Bearer <token>` header.

#### Authentication (3 endpoints)
```
POST   /api/auth/register     # Create new account
POST   /api/auth/login        # User login
GET    /api/auth/me           # Get current user
```

#### Transactions (5 endpoints)
```
POST   /api/transactions      # Create transaction
GET    /api/transactions      # Get all user transactions
GET    /api/transactions/:id  # Get single transaction
PUT    /api/transactions/:id  # Update transaction
DELETE /api/transactions/:id  # Delete transaction
```

#### Dashboard (4 endpoints)
```
GET    /api/dashboard/summary          # Total income/expenses/savings
GET    /api/dashboard/by-category      # Category breakdown with %
GET    /api/dashboard/recent           # Recent transactions
GET    /api/dashboard/satisfaction     # Satisfaction analysis
```


## 💾 Database Design

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,              // "Aman Singh"
  email: String,             // "aman@example.com" (unique)
  password: String,          // Hashed with bcrypt
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction Schema
```javascript
{
  _id: ObjectId,
  userId: ObjectId,          // Reference to User
  amount: Number,            // 250
  type: String,              // "income" | "expense"
  category: String,          // "food", "travel", etc.
  purpose: String,           // "Lunch with friends"
  satisfaction: String,      // "happy" | "neutral" | "regret"
  date: Date,                // Transaction date
  createdAt: Date,
  updatedAt: Date
}
```

### Categories (8 Student-Focused)
```
🍔 Food          🚌 Travel        🎬 Cinema        🧴 Personal Care
📺 Subscriptions 🛒 Groceries     👕 Clothes       📚 Stationary
```

---

## 🎓 What I Learned

### Technical Skills
- ✅ RESTful API design principles
- ✅ JWT authentication implementation
- ✅ MongoDB schema design & relationships
- ✅ Express.js middleware pattern
- ✅ Password hashing with bcrypt
- ✅ MongoDB aggregation pipelines
- ✅ Error handling best practices
- ✅ Environment-based configuration

### Professional Skills
- ✅ Git workflow (meaningful commits)
- ✅ Project structure organization
- ✅ API documentation
- ✅ Code modularity (MVC pattern)
- ✅ Security best practices
- ✅ Testing methodology

### Tools Mastered
- ✅ VS Code with extensions
- ✅ Thunder Client for API testing
- ✅ MongoDB Compass
- ✅ Git & GitHub
- ✅ npm package management

---

## 🤝 Contributing

This is a learning project, but contributions are welcome!

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Commit Convention
```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code formatting
refactor: Code restructuring
test:     Adding tests
chore:    Build/config changes
```

---

## Roadmap
- [ ] Budget goals & alerts
- [ ] Recurring transactions
- [ ] Monthly reports via email
- [ ] Data export (CSV/PDF)
- [ ] Group expenses (shared with roommates)

---

## 💡 Inspiration

This project was born from personal experience as a student struggling to manage pocket money. By building PocketPilot, I'm:

1. **Learning** - MERN stack development hands-on
2. **Solving** - A real problem I face daily
3. **Sharing** - Open source for other students
4. **Growing** - Technical and professional skills

---

## 📧 Contact & Connect

**Aman Singh**

- 🐙 GitHub: [@amansingh4517](https://github.com/amansingh4517)
- 💼 LinkedIn: [@aman-singh4545](https://www.linkedin.com/in/aman-singh4545/)
- 🌐 Portfolio: Coming soon

**Let's connect if you're:**
- Learning MERN stack
- Building similar projects
- Interested in contributing
- Want to discuss features

---
