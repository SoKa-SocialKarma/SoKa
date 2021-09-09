\c soka;

INSERT INTO users
(name, lastname, username, location, gender, radius, karma, badges, goals, experience, availability, matchRequests, pendingReview)
VALUES
('Daniel', 'Naranjo', 'PompaDonpa-ETH',
'Glendale, NY', 'Male', 10, 4.52, true,
'{"goals":["Chest","Legs","Back","Arms & Shoulders","Abs"]}',
'{"experience":["Power Lifting","Body Building","Weigth Lifting"]}',
'{"days":["9/15/21","10/14/2021","12/1/21"]}',
'{"matchRequests":2,"acceptedMatch":5}',
'{"pendingReview":true,"reviewing":""}'),
('Talia','Pichardo','T-money',
'New York, NY','Female', 10, 5.0, true,
'{"goals":["HIIT Cardio","Abs"]}',
'{"experience":["Weigth Lifting"]}',
'{"days":["9/15/21","12/1/21","11/4/2021"]}',
'{"matchRequests":12,"acceptedMatch":7}',
'{"pendingReview":false,"reviewing":""}'),
('Esay', 'Hernandez', 'EZ',
'Bronx, NY', 'Male', 10, 4.97, true,
'{"goals":["Chest","Legs","Back","Arms & Shoulders","Abs"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/21","10/1/21","10/8/21"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Maria', 'Rodriguez', 'MRodriguez',
'Bronx, NY', 'Female', 10, 4.79, true,
'{"goals":["Legs","Back","Abs"]}',
'{"experience":["Body Building","Weigth Lifting","HIIT Cardio"]}',
'{"days":["9/26/21","10/8/21","12/1/21"]}',
'{"matchRequests":2,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('John', 'Smith', 'JohnnyBoy22',
'Glendale, NY', 'Male', 25, 5.0, true,
'{"goals":["Chest","Back","HIIT Cardio","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/21","11/1/21","12/1/21"]}',
'{"matchRequests":2,"acceptedMatch":8}',
'{"pendingReview":true,"reviewing":"PompaDonpa-ETH"}')
('Suzy', 'James', 'Suzzzy5',
'Harlem, NY', 'Female', 25, 4.97, true,
'{"goals":["Legs","Back","Arms & Shoulders","Abs","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/21","10/1/21","10/8/21","11/4/2021"]}',
'{"matchRequests":3,"acceptedMatch":2}',
'{"pendingReview":false,"reviewing":""}')
('Andre', 'Sequeria', 'LiftKingDre',
'Glendale, NY', 'Male', 10, 5.0, true,
'{"goals":["Chest","Legs","Back","Arms & Shoulders","Abs","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["11/1/21"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Carlos', 'Cardozo', 'CCardozo25',
'Bronx, NY', 'Male', 7, 4.56, true,
'{"goals":["Chest","Back","Arms & Shoulders"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/21","9/26/2021","10/8/2021"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Natalie', 'Davis', 'NatD',
'Brooklyn, NY', '', 5, 4.29, true,
'{"goals":["Legs","Back","Abs","Arms & Shoulders","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/28/21","10/29/21","11/17/21"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Noah', 'Baker', 'GymLover22',
'Brooklyn, NY', 'Male', 10, 4.98, true,
'{"goals":["Chest","Back","Arms & Shoulders","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/28/21","10/1/21","10/08/21","12/1/2021"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Darla', 'Williams', 'ItsDarla',
'Brooklyn, NY', 'Male', 10, 4.82, true,
'{"goals":["Chest","Legs","Abs","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["10/29/21","11/17/21,"12/1/2021"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Lucas', 'Garcia', 'Luki28',
'Brooklyn, NY', 'Male', 7, 4.97, true,
'{"goals":["Chest","Back","Arms & Shoulders","Abs","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["10/1/21","10/08/21"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}')
('Sofia', 'Roberts', 'Sofieee',
'New York, NY', 'Female', 15, 4.97, true,
'{"goals":["Abs","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["10/14/21"]}',
'{"matchRequests":3,"acceptedMatch":4}',
'{"pendingReview":false,"reviewing":""}');

INSERT INTO activities
(name, is_outdoor, pairable, details)
VALUES
('Gym', true, true,
'{"goals":["Chest","Legs","Back","Abs","Arms & Shoulders","Cardio","HIIT Cardio","LIIT Cardio"]}');

INSERT INTO badges
(badge_name, image, description)
VALUES
('Great Motivator','http://soka-album.firebase.com/badges/great-motivator.png',
'{"recap":"Enthusiastic"}'),
('Spot On','http://soka-album.firebase.com/badges/spot-on.png',
'{"recap":"Assisted in lifting heavy weights safely"}'),
('Mobility Master','http://soka-album.firebase.com/badges/mobility-master.png',
'{"recap":"Helped stretch tighten muscles before workout"}');

INSERT INTO username_badges
(username, badges)
VALUES
('PompaDonpa-ETH', '{"badges":["Great Motivator","Spot On"]}'),
('T-money','{"badges":["Mobility Master"]}'),
('EZ', '{ "badges":["Great Motivator","Spot On"]}');

INSERT INTO username_friends
(username, friends)
VALUES
('PompaDonpa-ETH','{"friends":["T-money","EZ"]}'),
('T-money','{"friends":["PompaDonpa-ETH","EZ"]}'),
('EZ','{"friends":["PompaDonpa-ETH","T-money"]}');

INSERT INTO username_matches
(username, matches)
VALUES
('PompaDonpa-ETH', '{"pendingReview":true,"reviewing":"EZ"}'),
('T-money','{"pendingReview":false,"reviewing":""}'),
('EZ','{"pendingReview":true,"reviewing":"PompaDonpa-ETH"}');
