Investor Dashboard — Full Stack App
A simple web application to manage users, portfolios, transactions, and reports.
Built with Node.js (Express, SQLite) on the backend and React.js (MUI, Axios, Recharts) on the frontend.

✅ Project Setup Guide
1️⃣ Clone the Project
git clone https://github.com/your-repo/investor-dashboard.git
cd investor-dashboard

🛠️ Backend Setup (Node.js + Express + SQLite)
Step 1 — Go to Backend Folder
cd Backend

Step 2 — Install Dependencies
npm install

Step 3 — Initialize the Database
node database.js

Step 4 — Seed Dummy Data (Users, Investments, Transactions, Reports)
node dummydata.js

Step 5 — Start the Server
node server.js
Backend will run on: http://localhost:5000

💻 Frontend Setup (React.js)
Step 1 — Open New Terminal and Go to Frontend Folder
cd ../frontend

Step 2 — Install Dependencies
npm install

Step 3 — Make Sure Proxy is Set in package.json
"proxy": "http://localhost:5000"

Step 4 — Start React App
npm start
Frontend will run on: http://localhost:3000

👤 Sample Users to Login
Username	Password	Role
admin	admin123	Admin
viewer	viewer123	Viewer
alice	alicepass	User

📋 Main Features
Admin Dashboard:

View all users’ portfolios and transactions

Download investment reports in CSV format

User Dashboard:

View your own portfolio and recent transactions

🗂️ Backend API Routes
Route	Description
POST /auth/login	Login
GET /data/portfolio	Get portfolio (user)
GET /data/portfolio/admin	Get all portfolios (admin)
GET /data/portfolio/:username	Download CSV for a user
GET /data/transactions	Get transactions
GET /data/reports	Get reports (admin)

📝 Important Notes
Keep both frontend and backend running together