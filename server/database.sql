CREATE DATABASE glints;

CREATE TABLE profiles(
    profile_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    image VARCHAR(255),
    age INTEGER,
    private BOOLEAN
);