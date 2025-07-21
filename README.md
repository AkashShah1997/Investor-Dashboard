Investor Dashboard
A simple full-stack web app to manage users, investments, transactions, and reports with admin and user roles.

Backend (Node.js + Express + SQLite)
How to Run Backend:
Open terminal and go to the Backend folder

Install dependencies:


npm install
Initialize the database:


node database.js
Insert dummy data (users, portfolios, transactions, reports):

node dummydata.js
Start the server:


node server.js
The backend runs on http://localhost:5000

It uses express-session for auth

Dummy users are seeded (admin, viewer, alice, bob, charlie)

Frontend (React + MUI + Axios + Recharts)
How to Run Frontend:
Open a new terminal and go to the Frontend folder

Install dependencies:


npm install
Make sure proxy is set in package.json like this:


"proxy": "http://localhost:5000"
Start React App:


npm start
The frontend runs on http://localhost:3000

Admin can see reports, download CSVs, and view all data

Sample Users:
Username	Password	Role
admin	admin123	Admin
viewer	viewer123	Viewer
alice	alicepass	User

Routes Overview:
/auth/login — Login

/data/portfolio — Get Portfolio

/data/portfolio/admin — Get All Portfolios (Admin)

/data/portfolio/:username — Download CSV for a user (Admin)

/data/transactions — Get Transactions

/data/reports — Get Reports (Admin)

Quick Note
Keep both frontend and backend running for the app to work