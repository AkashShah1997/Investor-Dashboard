# Investor Dashboard — Full Stack App

A modern web application to manage users, portfolios, transactions, and reports.

**Tech Stack:**  
- **Backend:** Node.js (Express, SQLite)  
- **Frontend:** React.js (Material UI, Axios, Recharts)

---

## 🚀 Live Demo

The app is live and ready to use at:  
[http://18.118.23.137/](http://18.118.23.137/)  
(Hosted on AWS)

---

## 🛠️ Step-by-Step Setup Guide

### 1️⃣ Clone the Project

```sh
git clone https://github.com/your-repo/investor-dashboard.git
cd investor-dashboard
```

---

### 2️⃣ Backend Setup (Node.js + Express + SQLite)

**Step 1:** Go to the Backend folder  
```sh
cd Backend
```

**Step 2:** Install dependencies  
```sh
npm install
```

**Step 3:** Initialize the database  
```sh
node database.js
```

**Step 4:** Seed dummy data (users, investments, transactions, reports)  
```sh
node dummydata.js
```

**Step 5:** Start the backend server  
```sh
node server.js
```
The backend will run at: [http://localhost:5000](http://localhost:5000)

---

### 3️⃣ Frontend Setup (React.js)

**Step 1:** Open a new terminal and go to the frontend folder  
```sh
cd ../frontend
```

**Step 2:** Install dependencies  
```sh
npm install
```

**Step 3:** Set up environment variables  
- Make sure you have a `.env` file in the `frontend` folder with:
  ```
  REACT_APP_API_URL=http://3.145.4.69:5000
  ```
  *(Or update to your localhost URL if needed)*

**Step 4:** Start the React app  
```sh
npm start
```
The frontend will run at: [http://localhost:3000](http://localhost:3000)

---

## 👤 Demo Credentials

You can use these accounts to log in (also shown on the login page):

| Username | Password   | Role   |
|----------|------------|--------|
| admin    | admin123   | Admin  |
| viewer   | viewer123  | Viewer |
| alice    | alicepass  | User   |

---

## 📋 Main Features

**Admin Dashboard:**
- View all users’ portfolios and transactions
- Download investment reports in CSV format

**User Dashboard:**
- View your own portfolio and recent transactions

---

## 🗂️ Backend API Routes

| Route                        | Description                      |
|------------------------------|----------------------------------|
| POST `/auth/login`           | Login                            |
| GET `/data/portfolio`        | Get portfolio (user)             |
| GET `/data/portfolio/:username` | Get portfolio for a username (admin) |
| GET `/data/transactions`     | Get transactions                 |
| GET `/data/reports`          | Get reports (admin)              |

---

## 📝 Notes

- **Keep both frontend and backend running together** for no crashes.
- **Demo credentials** are shown at the bottom of the login page for easy access.
- If you change environment variables, **restart your React dev server**.
- For any issues, check your terminal for errors and ensure all dependencies are installed.

---

## It was an amazing project got to learn alot in the process!
