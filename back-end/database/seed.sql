\c soka;

INSERT INTO users
(name, lastname, username, location, gender, radius, karma, badges, goals, experience, availability, matchRequests, pendingReview)
VALUES
('Daniel', 'Naranjo', 'PompaDonpa-ETH',
'Glendale, NY', 'Male', 10, 4.52, true,
'{"goals": ["Endurance", "Spot Matching", "Weigth Gain", "Motivation", "Competing"]}',
'{"experience": ["Power Lifting", "Body Building", "Weigth Lifting"]',
'{"days":["9/15/21","12/1/21"]}',
'{"matchRequests": 2, "acceptedMatch": 5}',
'{"pendingReview":true,"reviewing":"${username}"}');

INSERT INTO activities
(name, is_outdoor, pairable, details)
VALUES
('Cycling', true, true,
'{"endurance": 9.63}');
