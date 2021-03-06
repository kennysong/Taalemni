

Template.home.events({
	'click #facebook-login' : function () {
		Meteor.loginWithFacebook({
			requestPermissions: ['email', 'user_location', 'user_friends', 'read_friendlists']
		}, function (err) {
			if (err) {
				Session.set('errorMessage', err.reason || 'Unknown error');
			}
			console.log(Meteor.user())

			Meteor.call('FindFriends', function(error) {  
				console.log(error);
		    });

		    Meteor.Router.to('/dashboard');
		});
	}
});