Template.hello.greeting = function () {
	return "Welcome to SATisfaction.";
};

Template.hello.events({
	'click #facebook-login' : function () {
		Meteor.loginWithFacebook({
			requestPermissions: ['email', 'user_location', 'user_friends', 'read_friendlists']
		}, function (err) {
			if (err) {
				Session.set('errorMessage', err.reason || 'Unknown error');
			}
		});
	}
});

Meteor.autorun(function() {
  if (Meteor.user()) {
    // do something when they've just logged in.
    Meteor.call('FindFriends', function(error, friends) {  
		id = Meteor.user()._id;
		Meteor.users.update(id, {$set: {'BadgeIDs': [], 'Level': 1, 'MathWin': 0, 'MathLose': 0, 'ReadingWin': 0, 'ReadingLose': 0, 'WritingWin': 0, 'WritingLose': 0, 'Friends':friends}});
    });
    
  }
});