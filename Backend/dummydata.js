const bcrypt = require('bcryptjs');
const db = require('./database');

  // Insert multiple users with hashed passwords
  const users = [
    { username: 'admin', password: bcrypt.hashSync('admin123', 10), role: 'admin' },
    { username: 'viewer', password: bcrypt.hashSync('viewer123', 10), role: 'viewer' },
    { username: 'alice', password: bcrypt.hashSync('alicepass', 10), role: 'user' },
    { username: 'bob', password: bcrypt.hashSync('bobpass', 10), role: 'user' },
    { username: 'charlie', password: bcrypt.hashSync('charliepass', 10), role: 'user' }
  ];

  const insertUser = db.prepare(`INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`);
  users.forEach(user => insertUser.run(user.username, user.password, user.role));
  insertUser.finalize();

  // After users inserted, get their IDs
  db.all(
    `SELECT id, username FROM users WHERE username IN ('admin', 'viewer', 'alice', 'bob', 'charlie')`,
    (err, rows) => {
      if (err) {
        console.error('Error fetching user IDs:', err);
        return;
      }

      const userMap = {};
      rows.forEach(row => {
        userMap[row.username] = row.id;
      });

      // Many portfolios
      const portfolios = [
        { user_id: userMap['admin'], investment_name: 'Apple Inc.', value: 15000 },
        { user_id: userMap['admin'], investment_name: 'Tesla', value: 8000 },
        { user_id: userMap['viewer'], investment_name: 'Amazon', value: 12000 },
        { user_id: userMap['alice'], investment_name: 'Microsoft', value: 9000 },
        { user_id: userMap['alice'], investment_name: 'Netflix', value: 4000 },
        { user_id: userMap['bob'], investment_name: 'Google', value: 11000 },
        { user_id: userMap['bob'], investment_name: 'Facebook', value: 6000 },
        { user_id: userMap['charlie'], investment_name: 'NVIDIA', value: 13000 },
        { user_id: userMap['charlie'], investment_name: 'Intel', value: 3000 }
      ];

      const insertPortfolio = db.prepare(`INSERT INTO portfolio (user_id, investment_name, value) VALUES (?, ?, ?)`);
      portfolios.forEach(p => insertPortfolio.run(p.user_id, p.investment_name, p.value));
      insertPortfolio.finalize();

      // More transactions
      const transactions = [
        { user_id: userMap['admin'], description: 'Bought Apple shares', amount: -15000, date: '2025-07-20' },
        { user_id: userMap['admin'], description: 'Sold Tesla shares', amount: 3000, date: '2025-07-15' },
        { user_id: userMap['viewer'], description: 'Bought Amazon shares', amount: -12000, date: '2025-07-18' },
        { user_id: userMap['alice'], description: 'Bought Microsoft shares', amount: -9000, date: '2025-07-22' },
        { user_id: userMap['alice'], description: 'Bought Netflix shares', amount: -4000, date: '2025-07-25' },
        { user_id: userMap['bob'], description: 'Bought Google shares', amount: -11000, date: '2025-07-10' },
        { user_id: userMap['bob'], description: 'Bought Facebook shares', amount: -6000, date: '2025-07-12' },
        { user_id: userMap['charlie'], description: 'Bought NVIDIA shares', amount: -13000, date: '2025-07-05' },
        { user_id: userMap['charlie'], description: 'Bought Intel shares', amount: -3000, date: '2025-07-08' }
      ];

      const insertTransaction = db.prepare(`INSERT INTO transactions (user_id, description, amount, date) VALUES (?, ?, ?, ?)`);
      transactions.forEach(t => insertTransaction.run(t.user_id, t.description, t.amount, t.date));
      insertTransaction.finalize();

      // Multiple reports per user
      const reports = [
        { user_id: userMap['admin'], report_url: 'http://reports.example.com/admin_report_1.pdf', created_at: '2025-07-21' },
        { user_id: userMap['admin'], report_url: 'http://reports.example.com/admin_report_2.pdf', created_at: '2025-07-24' },
        { user_id: userMap['viewer'], report_url: 'http://reports.example.com/viewer_report_1.pdf', created_at: '2025-07-20' },
        { user_id: userMap['alice'], report_url: 'http://reports.example.com/alice_report_1.pdf', created_at: '2025-07-22' },
        { user_id: userMap['alice'], report_url: 'http://reports.example.com/alice_report_2.pdf', created_at: '2025-07-26' },
        { user_id: userMap['bob'], report_url: 'http://reports.example.com/bob_report_1.pdf', created_at: '2025-07-23' },
        { user_id: userMap['charlie'], report_url: 'http://reports.example.com/charlie_report_1.pdf', created_at: '2025-07-19' },
        { user_id: userMap['charlie'], report_url: 'http://reports.example.com/charlie_report_2.pdf', created_at: '2025-07-27' }
      ];

      const insertReport = db.prepare(`INSERT INTO reports (user_id, report_url, created_at) VALUES (?, ?, ?)`);
      reports.forEach(r => insertReport.run(r.user_id, r.report_url, r.created_at));
      insertReport.finalize();

      console.log('Database seeded with more users and data!');
    }
  );

setTimeout(() => {
  db.close();
}, 1500);
