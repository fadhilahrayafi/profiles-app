CREATE DATABASE glints;

CREATE TABLE profiles(
    profile_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    age INTEGER,
    private BOOLEAN
);

CREATE TABLE works (
    id SERIAL PRIMARY KEY,
    profile_id INTEGER,
    start_date DATE,
    end_date DATE,
    is_current BOOLEAN,
    title VARCHAR(255),
    company_name VARCHAR(255),
    company_logo VARCHAR(255),
    description VARCHAR(500)
)