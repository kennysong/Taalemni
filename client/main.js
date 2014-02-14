Template.hello.greeting = function () {
	return "Welcome to SATisfaction.";
};

Template.hello.events({
	'click #facebook-login' : function () {
		Meteor.loginWithFacebook({
			requestPermissions: ['email', 'user_location']
		}, function (err) {
			if (err)
				Session.set('errorMessage', err.reason || 'Unknown error');
		});
	}
});