Template.dashboard.events({
	'click .game':function() {
		Meteor.Router.to('/popup');
	}
})

Template.dashboard.UserName = function() {
	return Meteor.user().profile.name
}

Template.dashboard.UserPic = function () {
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=150&height=150";
}

Template.dashboard.UserGameData = function () {
	//return Meteor.userId()
	return Meteor.user();

};

Template.dashboard.MathWinPercentage = function () {
	if ((Meteor.user().MathLose + Meteor.user().MathWin)>0)
	{var MathPercentage = 100 * (Meteor.user().MathWin)/(Meteor.user().MathLose + Meteor.user().MathWin);
		return MathPercentage.toFixed(2) + " %"}
	else {
		console.log("something")
		return "No Questions Answered"}

};

Template.dashboard.ReadWinPercentage = function () {
	if ((Meteor.user().ReadingLose + Meteor.user().ReadingWin)>0)
	{var ReadPercentage = 100 * (Meteor.user().ReadingWin)/(Meteor.user().ReadingLose + Meteor.user().ReadingWin);
		return ReadPercentage.toFixed(2) + " %"}
	else {
		return "No Questions Answered"}

};

Template.dashboard.WritWinPercentage = function () {
	if ((Meteor.user().WritingLose + Meteor.user().WritingWin)>0)
	{var WritPercentage = 100 * (Meteor.user().WritingWin)/(Meteor.user().WritingLose + Meteor.user().WritingWin);
		return WritPercentage.toFixed(2) + " %"}
	else {
		return "No Questions Answered"}

};

Template.dashboard.UserLevel = function () {
	return Meteor.user().Level;

};

Template.dashboard.UserBadges = function () {
	return Meteor.user().BadgeIDs

};