var deps = require('../../config/db');

function isUserAuthenticated(firstName, lastName, callback) {

	deps.db.query('SELECT UserID FROM BlendConf.Users WHERE FirstName = ? AND LastName = ? AND Validated = 0', [firstName,lastName],function(err, rows) {
			if (err) return callback(err);
			if (!rows[0]) return callback({'message':'Invalid User'});

			try {
		      	callback(null, {'userID':rows[0].UserID});
		    } catch (e) {
		      callback(e);
		    }			 
		
	});
}

function setUserAuthenticated(email, userID, callback) {

	deps.db.query('UPDATE BlendConf.Users SET Email = ?, Validated = 1 WHERE UserID = ? ', [email,userID],function(err, row) {
			if (err) return callback(err);
			if (row.changedRows === 0) return callback({'message':'Could not update User'});

		    callback(null, row);		    	 
	});
}

module.exports.isUserAuthenticated = isUserAuthenticated;
module.exports.setUserAuthenticated = setUserAuthenticated;