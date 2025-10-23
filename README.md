# 💰 PocketPilot - Student Finance Tracker

> **Empowering students to take control of their finances, one transaction at a time.**

A full-stack personal finance management application designed specifically for students to track pocket money, analyze spending patterns, and build healthy financial habits through mindful expense tracking.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=for-the-badge)

---

## 📊 Project Progress

```
████████████████░░░░░░░░░░░░ 55% Complete

✅ Planning & Design          [100%] ━━━━━━━━━━ Complete
✅ Backend Development        [100%] ━━━━━━━━━━ Complete
⏳ Frontend Development       [ 0%] ░░░░░░░░░░ Not Started
⏳ Integration & Testing      [ 0%] ░░░░░░░░░░ Not Started
⏳ Deployment                 [ 0%] ░░░░░░░░░░ Not Started
```

**Last Updated:** October 23, 2025  
**Status:** Backend Complete | Frontend In Progress  
**Developer:** [@amansingh4517](https://github.com/amansingh4517)

---

## 🎯 The Problem

As students, we receive pocket money from parents but often lose track of:
- Where our money goes
- Whether purchases were worth it
- How much we can save
- Spending patterns across categories

**PocketPilot solves this** by providing an intuitive platform to track, analyze, and reflect on financial decisions.

---

## ✨ Key Features

### ✅ Implemented (Backend Complete)

- 🔐 **Secure Authentication**
  - User registration with encrypted passwords
  - JWT-based login system
  - Protected routes with middleware

- 💸 **Transaction Management**
  - Add income (pocket money, gifts, freelance)
  - Record expenses with 8 categories
  - Edit and delete transactions
  - Date-based tracking

- 📊 **Dashboard Analytics**
  - Real-time financial summary (income, expenses, savings)
  - Category-wise breakdown with percentages
  - Recent transaction history
  - Satisfaction analysis

- 😊 **Unique Feature: Satisfaction Rating**
  - Rate each expense: Happy 😊 | Neutral 😐 | Regret 😢
  - Track if purchases were worth it
  - Build financial awareness over time

### 🔄 In Progress

- 🎨 Frontend UI/UX with React
- 📱 Responsive design for mobile
- 📈 Interactive charts and visualizations
- 🔍 Advanced filtering and search

### 📋 Planned

- 🎯 Budget goals and alerts
- 📧 Monthly email reports
- 💾 Export data (CSV/PDF)
- 🔄 Recurring transactions
- 👥 Compare with peers (anonymous)

---

## 🏗️ Architecture

```
pocketpilot/
│
├── 📁 backend/                    ✅ COMPLETE
│   ├── src/
│   │   ├── config/                # Database connection
│   │   ├── controllers/           # Business logic (3 controllers)
│   │   ├── middleware/            # JWT auth middleware
│   │   ├── models/                # MongoDB schemas (2 models)
│   │   ├── routes/                # API endpoints (3 route files)
│   │   ├── utils/                 # Constants & helpers
│   │   └── server.js              # Express server entry
│   ├── .env                       # Environment variables
│   ├── package.json               # Dependencies
│   └── README.md                  # Backend documentation
│
└── 📁 frontend/                   ⏳ COMING SOON
    ├── src/
    │   ├── components/            # Reusable UI components
    │   ├── pages/                 # Route pages
    │   ├── services/              # API integration
    │   ├── utils/                 # Helper functions
    │   └── App.jsx                # Root component
    └── package.json
```

---

## 🛠️ Tech Stack

### Backend (Complete ✅)

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | JavaScript runtime |
| Express.js | 4.x | Web framework |
| MongoDB | 6.x | NoSQL database |
| Mongoose | 8.x | ODM for MongoDB |
| JWT | 9.x | Authentication |
| Bcrypt | 2.x | Password encryption |

### Frontend (Planned 🔄)

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI library |
| Vite | 5.x | Build tool |
| TailwindCSS | 3.x | Styling |
| Axios | 1.x | HTTP client |
| Chart.js | 4.x | Data visualization |
| React Router | 6.x | Navigation |

---

## 📚 API Overview

### ✅ Completed Endpoints (13 Total)

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


## 🚀 Getting Started

### Prerequisites

```bash
# Required software
Node.js (v14+)
MongoDB (local or Atlas)
npm or yarn
Git
```

### 🔧 Backend Setup (Ready to Run!)

```bash
# 1. Clone the repository
git clone https://github.com/amansingh4517/pocketpilot.git
cd pocketpilot/backend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# 4. Start the server
npm run dev

# Server runs on http://localhost:5000
```

✅ **Backend Status:** Fully functional and tested!

---

### 🎨 Frontend Setup (Coming Soon)

```bash
# Will be available soon
cd pocketpilot/frontend
npm install
npm run dev
```

⏳ **Frontend Status:** Development starting soon!

---

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

## 🧪 Testing Status

### Backend Testing ✅
- [x] User registration
- [x] User login with JWT
- [x] Protected routes
- [x] Create income transaction
- [x] Create expense transaction
- [x] Get all transactions
- [x] Update transaction
- [x] Delete transaction
- [x] Dashboard summary
- [x] Category breakdown
- [x] Recent transactions
- [x] Satisfaction analysis
- [x] Authorization checks

**Tools Used:** Postman, Manual Testing

---

## 📈 Development Timeline

### Phase 1: Backend Development ✅ (Completed: Oct 23, 2025)
- [x] Project setup and structure
- [x] Database models design
- [x] Authentication system
- [x] Transaction CRUD operations
- [x] Dashboard analytics
- [x] API testing

**Duration:** 1 weeks  
**Status:** 100% Complete

---

### Phase 2: Frontend Development 🔄 (In Progress)
- [ ] React + Vite setup
- [ ] UI component library
- [ ] Authentication pages (Login/Register)
- [ ] Dashboard with charts
- [ ] Transaction list view
- [ ] Add/Edit transaction forms
- [ ] Category filter
- [ ] Responsive design

**Estimated Duration:** 3-4 weeks  
**Status:** Starting soon

---

### Phase 3: Integration & Polish ⏳ (Planned)
- [ ] Connect frontend to backend API
- [ ] Error handling & loading states
- [ ] Form validations
- [ ] User feedback (toasts/notifications)
- [ ] Performance optimization
- [ ] Cross-browser testing

**Estimated Duration:** 1-2 weeks  
**Status:** Not started

---

### Phase 4: Deployment 🚀 (Planned)
- [ ] Backend deployment (Render/Railway)
- [ ] Frontend deployment (Vercel/Netlify)
- [ ] MongoDB Atlas configuration
- [ ] Environment setup
- [ ] Domain configuration
- [ ] SSL certificates

**Estimated Duration:** 1 week  
**Status:** Not started

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

## 🔒 Security Features

- 🔐 **Password Encryption** - Bcrypt with salt rounds
- 🎫 **JWT Tokens** - Stateless authentication (7-day expiry)
- 🛡️ **Protected Routes** - Middleware verification
- 🔑 **Environment Variables** - Sensitive data hidden
- 👤 **User Authorization** - Users can only access own data
- ✅ **Input Validation** - Mongoose schema validation
- 🚫 **SQL Injection Prevention** - NoSQL with Mongoose

---

## 📸 Screenshots

*Coming soon after frontend development!*

**Planned Views:**
- 📊 Dashboard with financial summary
- 💸 Transaction list with filters
- ➕ Add transaction form
- 📈 Category breakdown charts
- 😊 Satisfaction analysis view

---

## 🗓️ Milestones Achieved

```
✅ Oct 3, 2025  - Project initialization
✅ Oct 5, 2025  - Database design complete
✅ Oct 10, 2025 - Authentication system working
✅ Oct 15, 2025 - Transaction CRUD complete
✅ Oct 20, 2025 - Dashboard analytics implemented
✅ Oct 23, 2025 - Backend fully tested & documented
⏳ Nov 5, 2025  - Frontend development (target)
⏳ Nov 20, 2025 - Full integration (target)
⏳ Nov 30, 2025 - Deployment (target)
```

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

## 🎯 Roadmap

### v1.0 (MVP) - Target: November 2025
- [x] Backend API
- [ ] Frontend UI
- [ ] Basic authentication
- [ ] Transaction management
- [ ] Dashboard analytics

### v2.0 - Future Enhancements
- [ ] Budget goals & alerts
- [ ] Recurring transactions
- [ ] Monthly reports via email
- [ ] Data export (CSV/PDF)
- [ ] - [ ] Group expenses (shared with roommates)

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

## ⭐ Show Your Support

If this project helped you learn or gave you ideas:

- ⭐ **Star** this repository
- 🍴 **Fork** it for your own use
- 📢 **Share** with fellow developers
- 💬 **Provide feedback** via issues

**Every star motivates me to build more! 🚀**

---

## 🙏 Acknowledgments

- **MongoDB** - For excellent documentation
- **Express.js** - For powerful web framework
- **React** - For component-based UI (coming soon!)
- **MERN Community** - For tutorials and support
- **YouTube Creators** - For free educational content
- **Open Source** - For making learning accessible
- **AI Tools** - For accelerating learning and problem-solving during development

---

## 📊 Project Stats

```
📁 Files Created:      25+
💻 Lines of Code:      ~2000
⏰ Development Time:   60+ hours
☕ Coffee Consumed:    Countless cups
🐛 Bugs Fixed:         Several (and counting)
💡 Lessons Learned:    Priceless
```

---

## 🎉 Latest Updates

### October 23, 2025
- ✅ Backend API complete (13 endpoints)
- ✅ All endpoints tested successfully
- ✅ Documentation updated
- ✅ Ready for frontend development
- 📝 Created comprehensive README
- 🎯 Next: Starting React frontend

---

<div align="center">

### 🚀 Built with 💻 and ☕ by Aman Singh

**Status:** Backend Complete | Frontend In Progress  
**Next Milestone:** Frontend MVP  
**Follow the journey:** [GitHub](https://github.com/amansingh4517) | [LinkedIn](https://linkedin.com/in/amansingh4517)

---

**⭐ Star this repo to follow the development journey!**

*"Learning in public, building for students."*

</div>
