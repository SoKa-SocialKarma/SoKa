\c soka;

INSERT INTO users
(name, lastname, email, username, pw_hsp, location, gender, karma, badges, interests, requests, goals)
VALUES
('Daniel', 'Naranjo', 'pompadonpa@4tomik.io', 'PompaDonpa-ETH',
'fff5839d388c6eaa20306d67b0eb7f6527876b4dc6156501135d50dfc5f74149', 
'Glendale, NY', 'Male', 4.52, true,
'{"activities": ["Power Lifting", "Body Building", "Weigth Lifting", "Cycling"], "skills": ["Web Developing","Trading"]}',
'{"pending": 2, "accepted": 5}',
'{"shortTerm": ["Endurance", "Spot Matching", "Weigth Gain"], "longTerm": ["Motivation", "Competing"]}');

INSERT INTO activities
(name, is_outdoor, pairable, data)
VALUES
('Cycling', true, true,
'{"description": "Cycling, also called bicycling or biking, is the use of bicycles for transport, recreation, exercise or sport. People engaged in cycling are referred to as cyclists, bicyclists, or bikers", "endurance": 9.63, "equipment": ["Bike", "Helmet"]}');