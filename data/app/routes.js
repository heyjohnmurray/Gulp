var userController = require('./controllers/userController');

module.exports = function(app) {

	app.post('/login/', function(req, res, next){

		userController.isUserAuthenticated(req.body.FirstName, req.body.LastName, function(err, user){
		    if (err) return next(err);

		    // User is valid set email and validated = 1 so they can't login again
		    
		    userController.setUserAuthenticated(req.body.Email,user.userID, function(err,auth){
		    	if (err) return next(err);

		    	res.send(user);
		    });
		});

	});

	app.get('*', function(req, res) {
				
		res.sendFile('/public/index.html', {root: __dirname+'/../'}); // load our public/index.html file

	});
};