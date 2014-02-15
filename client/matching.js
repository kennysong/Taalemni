Template.matching.SelfPic = function () {
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=200&height=200";
};