var userController = require('./controllers/userController');
var voteController = require('./controllers/voteController');

module.exports = function(app) {

	io.sockets.on('connection', function (socket) {
        socket.on('ready', function() {
            userController.getTopUsers(function(err,users){
            	if (err) return socket.emit('TopUserResponse', err);;

            	socket.emit('TopUserResponse', users);
            });

            
        });
    });

	app.post('/login/', function(req, res, next){

		req.assert('FirstName', 'First Name required').notEmpty();
		req.assert('LastName', 'Last Name required').notEmpty();
		req.assert('Email', 'Email required').notEmpty();
		req.assert('Email', 'Invalid email').isEmail();
		var errors = req.validationErrors(true);
		if (errors) return next({'name':'Validation Error', 'message':'There have been validation errors', 'errors':errors});

		userController.isUserAuthenticated(req.body.FirstName, req.body.LastName, function(err, user){
		    if (err) return next(err);

		    // User is valid set email and validated = 1 so they can't login again
		    
		    userController.setUserAuthenticated(req.body.Email,user.userID, function(err,auth){
		    	if (err) return next(err);

		    	res.send(user);
		    });
		});

	});

	app.post('/vote/', function(req, res, next){

		// store individual poll votes and if that is successful then they have not voted yet -- just in case
		voteController.storeUserVote(req.body.PollData, req.body.UserID, function(err, result){
			if (err) return next(err);

			// store their final results and return them
			userController.getUserResult(req.body.UserID, function(err, userResult){
				if (err) return next(err);

				res.send(userResult);
			});
		});
	});

	app.get('/leaderboard/', function(req, res) {
				
		res.sendFile('/public/leaderboard.html', {root: __dirname+'/../'}); // load our public/leaderboard.html file

	});

	app.get('*', function(req, res) {
				
		res.sendFile('/public/index.html', {root: __dirname+'/../'}); // load our public/index.html file

	});
};