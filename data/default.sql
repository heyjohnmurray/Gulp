CREATE USER 'rv-marketing'@'localhost' IDENTIFIED BY 'Soft8Volt';

GRANT ALL PRIVILEGES ON *.* TO 'rv-marketing'@'localhost' WITH GRANT OPTION;

CREATE DATABASE `BlendConf`;

CREATE TABLE `BlendConf`.`Users` (
  `UserID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Validated` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`UserID`),
  KEY `FirstNameLastName` (`FirstName`,`LastName`),
  KEY `Validated` (`Validated`)
);
