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

	// Just add a user and return userID
	app.post('/user/', function(req, res, next){

		req.assert('FirstName', 'First Name required').notEmpty();
		req.assert('LastName', 'Last Name required').notEmpty();
		req.assert('Email', 'Email required').notEmpty();
		req.assert('Email', 'Invalid email').isEmail();
		var errors = req.validationErrors(true);
		if (errors) return next({'name':'Validation Error', 'message':'There have been validation errors', 'errors':errors});

		userController.addUser(req.body.FirstName, req.body.LastName, req.body.Email ,function(err, user){
		    if (err) return next(err);

		    // User is valid set email and validated = 1 so they can't login again
		    res.send(user);
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

  app.get('/dashboard/', function(req, res) {
    res.sendFile('/public/dashboard.html', {root: __dirname+'/../'});
  });

  app.get('/admin/', function(req, res) {
    res.sendFile('/public/admin.html', {root: __dirname+'/..'});
  });

  app.post('/admin/user/', function(req, res) {
    userController.addNewUser(req.body.FirstName, req.body.LastName, function(err, user) {
      if (err) {
        res.status(400).send({message: err.message});
      }

      res.send(user);
    });
  });

  app.post("/admin/reset/", function(req, res) {
    userController.resetUser(req.body, function(err) {
      if (err) {
        return res.status(400).send({message: err.message});
      }

      res.status(200).end();
    });
  });

	app.get('*', function(req, res) {

		res.sendFile('/public/index.html', {root: __dirname+'/../'}); // load our public/index.html file

	});
};
