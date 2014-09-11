TRUNCATE TABLE BlendConf.Users;

INSERT INTO BlendConf.Users(FirstName, LastName, Email, Validated, PollResult, Started, Completed) VALUES
('Matt',     'Burke',        NULL, 0, NULL, NULL,                  NULL),
('John',     'Murray',       NULL, 0, NULL, NULL,                  NULL),
('Brian',    'Bachtel',      NULL, 0, NULL, NULL,                  NULL),
('Donald',   'Duck',         NULL, 1, 4,    '2014-09-08 12:42:23', '2014-09-08 12:43:32'),
('Mickey',   'Mouse',        NULL, 1, 6,    '2014-09-08 12:40:00', '2014-09-08 12:43:32'),
('Goofy',    'The Dog',      NULL, 1, 8,    '2014-09-08 12:40:00', '2014-09-08 12:44:53'),
('Minnie',   'Mouse',        NULL, 1, 9,    '2014-09-08 12:40:00', '2014-09-08 12:43:23'),
('Daisy',    'Duck',         NULL, 1, 10,   '2014-09-08 12:40:00', '2014-09-08 12:49:59'),
('The',      'Genie',        NULL, 1, 12,   '2014-09-08 12:40:00', '2014-09-08 12:41:00'),
('Aladin',   'No Last Name', NULL, 1, 4,    '2014-09-08 12:40:00', '2014-09-08 12:43:09'),
('Princess', 'Jasmine',      NULL, 1, 4,    '2014-09-08 12:40:00', '2014-09-08 12:43:00');

