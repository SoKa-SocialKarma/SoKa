DROP DATABASE IF EXISTS soka;
CREATE DATABASE soka;
\c soka;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    lastname TEXT,
    email VARCHAR(100) UNIQUE NOT NULL,
    username VARCHAR(16) UNIQUE NOT NULL,
    pw_hsp VARCHAR(64) NOT NULL,
    location TEXT NOT NULL,
    gender TEXT NOT NULL,
    interests JSONB NOT NULL,
    requests JSONB NOT NULL,
    goals JSONB NOT NULL,
    karma DECIMAL(5,2) DEFAULT 5,
    CHECK (karma >=1 AND karma <=5),
    badges BOOLEAN NOT NULL
);


DROP TABLE IF EXISTS activities;
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    data JSONB NOT NULL,
    is_outdoor BOOLEAN NOT NULL,
    pairable BOOLEAN NOT NULL
);


DROP TABLE IF EXISTS badges;
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    badge_name TEXT NOT NULL,
    image TEXT NOT NULL,
    description JSONB NOT NULL
);


DROP TABLE IF EXISTS person_badges;
CREATE TABLE person_badges (
    person_id INT NOT NULL,
    badges JSONB NOT NULL
);


DROP TABLE IF EXISTS username_friends CASCADE;
CREATE TABLE username_friends (
    username VARCHAR(16) REFERENCES users (username) ON DELETE CASCADE,
    friends JSONB NOT NULL
);


DROP TABLE IF EXISTS chats_record;
CREATE TABLE chats_record (
    id SERIAL PRIMARY KEY,
    p1_id INT NOT NULL,
    p2_id INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    convo_encrypted JSONB NOT NULL
);


DROP TABLE IF EXISTS meetings_records;
CREATE TABLE meetings_records (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time TIMETZ NOT NULL,
    location TEXT NOT NULL,
    p1_id INT NOT NULL,
    p2_id INT NOT NULL,
    covid_safe BOOLEAN NOT NULL
);