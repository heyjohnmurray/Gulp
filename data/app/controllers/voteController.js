var deps = require('../../config/db');

function storeUserVote(pollData, user, callback) {
	pollArr = JSON.parse(pollData);
	var values = new Array();

	for(key in pollArr){
		values.push([user,key,pollArr[key]]);
	}

	deps.db.query('INSERT INTO BlendConf.UserVotes (UserID, PollID, Vote) VALUES ?', [values],function(err, row) {
		if (err) return callback(err);

		updateUser(pollArr, user, function(err, results) {
			if(err) return callback(err);

			return callback(null, results);
		});

	});

}

function updateUser(pollArr, user, callback) {
	var numCorrect = 0;
	var theirAnswer = 0;

	getPollData( function(err, polls) {
		if(err) return callback(err);

		for(poll in polls){

			theirAnswer = pollArr[polls[poll].PollID];

			if(theirAnswer == polls[poll].Answer){
				numCorrect++;
			}
		}

		deps.db.query('UPDATE BlendConf.Users SET PollResult = ?, Completed = NOW() WHERE UserID = ? ', [numCorrect,user],function(err, row) {
			if (err) return callback(err);
			if (row.changedRows === 0) return callback({'message':'Could not update User'});

		    callback(null, row);
		});
	});
}

function getPollData(callback) {
	deps.db.query('SELECT * FROM BlendConf.Polls',function(err, rows) {
		if (err) return callback(err);

		return callback(null, rows);
	});
}

module.exports.storeUserVote = storeUserVote;
