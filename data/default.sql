CREATE USER 'rv-marketing'@'localhost' IDENTIFIED BY 'Soft8Volt';

GRANT ALL PRIVILEGES ON *.* TO 'rv-marketing'@'localhost' WITH GRANT OPTION;

CREATE DATABASE `BlendConf`;

DROP TABLE IF EXISTS BlendConf.Users;
CREATE TABLE `BlendConf`.`Users` (
  `UserID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Validated` tinyint(1) DEFAULT '0',
  `PollResult` tinyint(2) DEFAULT NULL,
  `Started` datetime DEFAULT NULL,
  `Completed` datetime DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `FirstNameLastName` (`FirstName`,`LastName`),
  KEY `Validated` (`Validated`)
);

DROP TABLE IF EXISTS BlendConf.UserVotes;
CREATE TABLE BlendConf.`UserVotes` (
  `UserVoteID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `UserID` int(11) DEFAULT NULL,
  `PollID` int(11) DEFAULT NULL,
  `Vote` tinyint(11) DEFAULT NULL,
  PRIMARY KEY (`UserVoteID`),
  UNIQUE KEY `UserID_PollID` (`UserID`,`PollID`)
);

DROP TABLE IF EXISTS BlendConf.Polls;
CREATE TABLE BlendConf.`Polls` (
  `PollID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `Answer` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`PollID`)
);

INSERT INTO BlendConf.`Polls` (`PollID`, `Answer`)
VALUES
	(1,1),
	(2,2),
	(3,2),
	(4,2),
	(5,2),
	(6,1),
	(7,1),
	(8,2),
	(9,2),
	(10,2),
	(11,1),
	(12,1);
