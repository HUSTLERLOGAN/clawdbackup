CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    account_id INT REFERENCES accounts(account_id),
    posts INT NOT NULL,
    views INT NOT NULL,
    date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);