CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    handle VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    owner VARCHAR(255) NOT NULL,
    creator_name VARCHAR(255) NOT NULL
);