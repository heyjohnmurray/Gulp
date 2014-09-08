var deps = require('../../config/db');

function isUserAuthenticated(firstName, lastName, callback) {

  deps.db.query('SELECT UserID, Validated FROM BlendConf.Users WHERE FirstName = ? AND LastName = ?', [firstName,lastName],function(err, rows) {
      if (err) return callback(err);
      if (!rows[0]) return callback({'message':'Unknown User'});
      if (rows[0].Validated) return callback({message: 'Already Voted'});

      try {
            callback(null, {'userID':rows[0].UserID});
        } catch (e) {
          callback(e);
        }

  });
}

function setUserAuthenticated(email, userID, callback) {

  deps.db.query('UPDATE BlendConf.Users SET Email = ?, Validated = 1, Started = NOW() WHERE UserID = ? ', [email,userID],function(err, row) {
      if (err) return callback(err);
      if (row.changedRows === 0) return callback({'message':'Could not update User'});

        callback(null, row);
  });
}

function getUserResult(userID, callback) {

  deps.db.query('SELECT PollResult FROM BlendConf.Users WHERE UserID = ? AND PollResult IS NOT NULL', [userID],function(err, row) {
      if (err) return callback(err);
      if (!row[0]) return callback({'message':'No Results for user'});

      try {
            callback(null, {'pollResult':row[0].PollResult});
        } catch (e) {
          callback(e);
        }

  });
}

function getTopUsers(callback) {
  var userQuery = "SELECT CONCAT(FirstName,' ',LastName) AS Name, PollResult, TIMEDIFF(Completed,Started) AS TimeCompleted, TIME_FORMAT(TIMEDIFF(Completed,Started), '%i:%s') AS FormatedTimeCompleted FROM BlendConf.Users WHERE PollResult IS NOT NULL AND Completed IS NOT NULL HAVING TimeCompleted > 0 ORDER BY PollResult DESC, TimeCompleted ASC LIMIT 10";

  deps.db.query(userQuery, function(err, rows) {
      if (err) return callback(err);
      if (!rows[0]) return callback({'message':'No Results'});

        callback(null, {'topResults':rows});

  });
}

function addUser(firstName, lastName, email, callback) {

  deps.db.query('INSERT INTO BlendConf.Users (FirstName, LastName, Email, Validated, Started) VALUES (?,?,?,1,NOW())', [firstName,lastName,email],function(err, rows) {
      if (err) return callback(err);

      try {
            callback(null, {'userID':rows.insertId});
        } catch (e) {
          callback(e);
        }

  });
}

function addNewUser(firstName, lastName, callback) {
  deps.db.query("SELECT * FROM BlendConf.Users WHERE FirstName = ? AND LastName = ?", [firstName, lastName], function(err, rows) {
    if (rows.length > 0) {
      return callback(new Error("User already exists"));
    }

    deps.db.query("INSERT INTO BlendConf.Users(FirstName, LastName) VALUES(?,?)", [firstName, lastName], function(err, rows) {
      if (err) return callback(err);

      try {
        callback(null, {'userID': rows.insertID});
      } catch(e) {
        callback(e);
      }
    });
  });
}

function resetUser(user, callback) {

  deps.db.query("SELECT UserID FROM BlendConf.Users WHERE FirstName = ? AND LastName = ? LIMIT 1", [user.FirstName, user.LastName], function(err, rows) {
    if (err) return callback(err);
    if (rows.length === 0) return callback(new Error("Could not locate user"));

    var userID = rows[0].UserID;

    deps.db.query("UPDATE BlendConf.Users SET Email='', Validated=0, PollResult=NULL, Started=NULL, Completed=NULL WHERE UserID = ?", [userID], function(err, rows) {
      if (err) return callback(err);

      deps.db.query("DELETE FROM BlendConf.UserVotes WHERE UserID = ?", [userID], function(err, rows) {
        if (err) return callback(err);

        callback(null);
      });
    });
  });
}

module.exports.isUserAuthenticated = isUserAuthenticated;
module.exports.setUserAuthenticated = setUserAuthenticated;
module.exports.getUserResult = getUserResult;
module.exports.getTopUsers = getTopUsers;
module.exports.addUser = addUser;
module.exports.addNewUser = addNewUser;
module.exports.resetUser = resetUser;
