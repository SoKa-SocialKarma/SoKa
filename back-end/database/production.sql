DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(28),
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    username VARCHAR(16),
    location TEXT,
    coordinates JSONB,
    gender TEXT,
    radius INT DEFAULT 5,
    CHECK (radius >=0 AND radius <=30),
    karma DECIMAL(10,2) DEFAULT 5,
    CHECK (karma >=1 AND karma <=5),
    image JSONB,
    badges BOOLEAN DEFAULT false,
    goals JSONB,
    experience JSONB,
    availability JSONB,
    matchRequests JSONB,
    pendingReview JSONB
);


DROP TABLE IF EXISTS activities;
CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_outdoor BOOLEAN NOT NULL,
    pairable BOOLEAN NOT NULL,
    goals JSONB NOT NULL
);


DROP TABLE IF EXISTS badges;
CREATE TABLE badges (
    id SERIAL PRIMARY KEY,
    badge_name TEXT NOT NULL,
    image JSONB NOT NULL,
    info JSONB NOT NULL
);


DROP TABLE IF EXISTS username_badges CASCADE;
CREATE TABLE username_badges (
    id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    username TEXT NOT NULL,
    badges JSONB NOT NULL
);


DROP TABLE IF EXISTS username_friends CASCADE;
CREATE TABLE username_friends (
    id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    username VARCHAR(16) ,
    friends JSONB NOT NULL
);

DROP TABLE IF EXISTS username_newUserBlocked;
CREATE TABLE username_newUserBlocked (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(28),
    blocked BOOLEAN NOT NULL
);