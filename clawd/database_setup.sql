-- SQL Schema for Tracking System

CREATE TABLE accounts (
    account_id SERIAL PRIMARY KEY,
    handle VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    owner VARCHAR(255) NOT NULL
);

CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    creator VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    platform VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    posts INT NOT NULL,
    views INT NOT NULL
);