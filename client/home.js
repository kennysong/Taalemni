Template.home.greeting = function () {
	return "Welcome to SATMatch.";
};

Template.home.events({
	'click #facebook-login' : function () {
		Meteor.loginWithFacebook({
			requestPermissions: ['email', 'user_location', 'user_friends', 'read_friendlists']
		}, function (err) {
			if (err) {
				Session.set('errorMessage', err.reason || 'Unknown error');
			}
			console.log(Meteor.user())

			Meteor.call('FindFriends', function(error, friends) {  
				id = Meteor.user()._id;
				console.log("Logged in: " + id)
				Meteor.users.update(id, {$set: {'BadgeIDs': [], 'Level': 1, 'MathWin': 0, 'MathLose': 0, 
					'ReadingWin': 0, 'ReadingLose': 0, 'WritingWin': 0, 'WritingLose': 0, 'Friends':friends['data']}});
		    });

		});
	}
});