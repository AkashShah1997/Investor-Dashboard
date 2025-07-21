INSERT INTO users (name) VALUES ('Alice Johnson');
INSERT INTO users (name) VALUES ('Michael Smith');


-- For Alice Johnson (user_id = 1)
INSERT INTO portfolio (user_id, investment_name, value) VALUES (1, 'Growth Equity Fund', 25500.75);
INSERT INTO portfolio (user_id, investment_name, value) VALUES (1, 'Tech Innovations Fund', 18000.00);

-- For Michael Smith (user_id = 2)
INSERT INTO portfolio (user_id, investment_name, value) VALUES (2, 'Global Opportunities Fund', 34000.90);
INSERT INTO portfolio (user_id, investment_name, value) VALUES (2, 'Healthcare Growth Fund', 15000.45);


-- Alice Johnson
INSERT INTO transactions (user_id, description, amount, date) VALUES (1, 'Purchased Growth Equity Fund shares', 10000.00, '2025-07-01');
INSERT INTO transactions (user_id, description, amount, date) VALUES (1, 'Dividend Received - Tech Innovations Fund', 500.00, '2025-07-10');
INSERT INTO transactions (user_id, description, amount, date) VALUES (1, 'Sold Partial Growth Equity Fund shares', -2500.00, '2025-07-15');

-- Michael Smith
INSERT INTO transactions (user_id, description, amount, date) VALUES (2, 'Purchased Healthcare Growth Fund shares', 15000.00, '2025-06-25');
INSERT INTO transactions (user_id, description, amount, date) VALUES (2, 'Interest Earned - Global Opportunities Fund', 750.00, '2025-07-05');
INSERT INTO transactions (user_id, description, amount, date) VALUES (2, 'Sold Global Opp_


-- Alice Johnson
INSERT INTO reports (user_id, report_url, created_at) VALUES (1, 'https://example.com/reports/alice_q2_2025.pdf', '2025-07-01');
INSERT INTO reports (user_id, report_url, created_at) VALUES (1, 'https://example.com/reports/alice_q1_2025.pdf', '2025-04-01');

-- Michael Smith
INSERT INTO reports (user_id, report_url, created_at) VALUES (2, 'https://example.com/reports/michael_q2_2025.pdf', '2025-07-01');
INSERT INTO reports (user_id, report_url, created_at) VALUES (2, 'https://example.com/reports/michael_q1_2025.pdf', '2025-04-01');
