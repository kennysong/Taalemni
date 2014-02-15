Template.dashboard.UserName = function() {
	return Meteor.user().profile.name
}
Template.dashboard.UserPic = function () {
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=150&height=150";
}



Template.dashboard.UserGameData = function () {
	return Meteor.userId()
	//return UsersHistory.find({Meteor.userId()});

};