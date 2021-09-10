\c soka;

INSERT INTO users
(name, lastname, username, location, gender, radius, karma, badges, goals, experience, availability, matchRequests, pendingReview)
VALUES
('Daniel', 'Naranjo', 'PompaDonpa-ETH',
'Glendale, NY', 'Male', 10, 4.82, true,
'{"goals":["Chest","Legs","Back","Arms & Shoulders","Abs"]}',
'{"experience":["Power Lifting","Body Building","Weigth Lifting"]}',
'{"days":["9/15/2021","10/14/2021","12/01/2021"]}',
'{"matchRequests":[4,5],"acceptedMatchesHistory":[2,3,6]}',
'{"pendingReview":true,"reviewing":{"id":6,"username":"Suzzzy5"}}'),
('Talia','Pichardo','T-money',
'New York, NY','Female', 10, 5.0, true,
'{"goals":["HIIT Cardio","Abs"]}',
'{"experience":["Weigth Lifting"]}',
'{"days":["9/15/2021","12/01/2021","11/04/2021"]}',
'{"matchRequests":[9,13],"acceptedMatchesHistory":[1,3,7]}',
'{"pendingReview":true,"reviewing":{"id":7,"username":"LiftKingDre"}}'),
('Esay', 'Hernandez', 'EZ',
'Bronx, NY', 'Male', 10, 4.97, true,
'{"goals":["Chest","Legs","Back","Arms & Shoulders","Abs"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/2021","10/01/2021","10/08/2021"]}',
'{"matchRequests":[6],"acceptedMatchesHistory":[1,2,8]}',
'{"pendingReview":true,"reviewing":{"id":8,"username":"CCardozo25"}}'),
('Maria', 'Rodriguez', 'MRodriguez',
'Bronx, NY', 'Female', 10, 4.79, true,
'{"goals":["Legs","Back","Abs"]}',
'{"experience":["Body Building","Weigth Lifting","HIIT Cardio"]}',
'{"days":["9/26/2021","10/08/2021","12/01/2021"]}',
'{"matchRequests":[1],"acceptedMatchesHistory":[5,12]}',
'{"pendingReview":false,"reviewing":{"id":0,"username":""}}'),
('John', 'Smith', 'JohnnyBoy22',
'Glendale, NY', 'Male', 25, 5.0, false,
'{"goals":["Chest","Back","HIIT Cardio","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/2021","11/01/2021","12/01/2021"]}',
'{"matchRequests":[1],"acceptedMatchesHistory":[4]}',
'{"pendingReview":false,"reviewing":{"id":0,"username":""}}'),
('Suzy', 'James', 'Suzzzy5',
'Harlem, NY', 'Female', 25, 4.97, true,
'{"goals":["Legs","Back","Arms & Shoulders","Abs","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/2021","10/01/2021","10/08/2021","11/04/2021"]}',
'{"matchRequests":[3],"acceptedMatchesHistory":[12,1]}',
'{"pendingReview":true,"reviewing":{"id":1,"username":"PompaDonpa-ETH"}}'),
('Andre', 'Sequeria', 'LiftKingDre',
'Glendale, NY', 'Male', 10, 5.0, false,
'{"goals":["Chest","Legs","Back","Arms & Shoulders","Abs","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["11/01/2021"]}',
'{"matchRequests":[10,11],"acceptedMatchesHistory":[2]}',
'{"pendingReview":true,"reviewing":{"id":2,"username":"T-money"}}'),
('Carlos', 'Cardozo', 'CCardozo25',
'Bronx, NY', 'Male', 7, 4.56, true,
'{"goals":["Chest","Back","Arms & Shoulders"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/15/2021","9/26/2021","10/08/2021"]}',
'{"matchRequests":[13],"acceptedMatchesHistory":[3]}',
'{"pendingReview":true,"reviewing":{"id":3,"username":"EZ"}}'),
('Natalie', 'Davis', 'NatD',
'Brooklyn, NY', '', 5, 4.29, false,
'{"goals":["Legs","Back","Abs","Arms & Shoulders","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/28/2021","10/29/2021","11/17/2021"]}',
'{"matchRequests":[2],"acceptedMatchesHistory":[10]}',
'{"pendingReview":true,"reviewing":{"id":10,"username":"GymLover22"}}'),
('Noah', 'Baker', 'GymLover22',
'Brooklyn, NY', 'Male', 10, 4.98, true,
'{"goals":["Chest","Back","Arms & Shoulders","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["9/28/2021","10/01/2021","10/08/2021","12/01/2021"]}',
'{"matchRequests":[7],"acceptedMatchesHistory":[9]}',
'{"pendingReview":true,"reviewing":{"id":9,"username":"NatD"}}'),
('Darla', 'Williams', 'ItsDarla',
'Brooklyn, NY', 'Male', 10, 4.82, false,
'{"goals":["Chest","Legs","Abs","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["10/29/2021","11/17/2021","12/01/2021"]}',
'{"matchRequests":[7],"acceptedMatchesHistory":[13]}',
'{"pendingReview":true,"reviewing":{"id":13,"username":"Sofieee"}}'),
('Lucas', 'Garcia', 'Luki28',
'Brooklyn, NY', 'Male', 7, 4.97, true,
'{"goals":["Chest","Back","Arms & Shoulders","Abs","LIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["10/01/2021","10/08/2021"]}',
'{"matchRequests":[0],"acceptedMatchesHistory":[6]}',
'{"pendingReview":false,"reviewing":{"id":0,"username":""}}'),
('Sofia', 'Roberts', 'Sofieee',
'New York, NY', 'Female', 15, 4.97, false,
'{"goals":["Abs","HIIT Cardio"]}',
'{"experience":["Body Building","Weigth Lifting"]}',
'{"days":["10/14/2021"]}',
'{"matchRequests":[2],"acceptedMatchesHistory":[11]}',
'{"pendingReview":true,"reviewing":{"id":11,"username":"ItsDarla"}}');

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
(id, username, badges)
VALUES
(1,'PompaDonpa-ETH', '{"badges":["Great Motivator","Spot On"]}'),
(2,'T-money','{"badges":["Mobility Master"]}'),
(3,'EZ', '{ "badges":["Great Motivator","Spot On"]}'),
(4,'MRodriguez', '{ "badges":["Great Motivator","Spot On", "Mobility Master"]}'),
(5,'JhonnyBoy22', '{ "badges":[]}'),
(6,'Suzzzy5', '{ "badges":["Mobility Master","Spot On"]}'),
(7,'LiftKingDre', '{ "badges":[]}'),
(8,'CCardozo25', '{ "badges":["Great Motivator"]}'),
(9,'NatD', '{ "badges":[]}'),
(10,'GymLover22', '{ "badges":["Great Motivator","Spot On","Mobility Master"]}'),
(11,'ItsDarla', '{ "badges":[]}'),
(12,'Luki28', '{ "badges":["Great Motivator","Spot On"]}'),
(13,'Sofieee', '{ "badges":[]}');





INSERT INTO username_friends
(id, username, friends)
VALUES
(1,'PompaDonpa-ETH','{"friends":[2,3]}'),
(2,'T-money','{"friends":[1,3]}'),
(3,'EZ','{"friends":[1,2]}'),
(4,'MRodriguez','{"friends":[5,12]}'),
(5,'JohnnyBoy22','{"friends":[4]}'),
(6,'Suzzzy5','{"friends":[12]}'),
(7,'LiftKingDre','{"friends":[]}'),
(8,'CCardozo25','{"friends":[]}'),
(9,'NatD','{"friends":[]}'),
(10,'GymLover22','{"friends":[]}'),
(11,'ItsDarla','{"friends":[]}'),
(12,'Luki28','{"friends":[4,6]}'),
(13,'Sofieee','{"friends":[]}');

-- INSERT INTO username_matches
-- (userid, username, matches)
-- VALUES
-- (1, 'PompaDonpa-ETH', '{"matches":[]}'),
-- ('T-money','{"pendingReview":false,"reviewing":""}'),
-- ('EZ','{"pendingReview":true,"reviewing":"PompaDonpa-ETH"}');
