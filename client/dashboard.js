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
	return UsersHistory.findOne({"UserID":Meteor.userId()});

};

Template.dashboard.MathWinPercentage = function () {
	var UserData = UsersHistory.findOne({"UserID":Meteor.userId()});
	if ((UserData.MathLose + UserData.MathWin)>0)
	{var MathPercentage = 100 * (UserData.MathWin)/(UserData.MathLose + UserData.MathWin);
		return MathPercentage.toFixed(2) + " %"}
	else {
		console.log("something")
		return "No Questions Answered"}

};

Template.dashboard.ReadWinPercentage = function () {
	var UserData = UsersHistory.findOne({"UserID":Meteor.userId()});
	if ((UserData.ReadingLose + UserData.ReadingWin)>0)
	{var ReadPercentage = 100 * (UserData.ReadingWin)/(UserData.ReadingLose + UserData.ReadingWin);
		return ReadPercentage.toFixed(2) + " %"}
	else {
		return "No Questions Answered"}

};

Template.dashboard.WritWinPercentage = function () {
	var UserData = UsersHistory.findOne({"UserID":Meteor.userId()});
	if ((UserData.WritingLose + UserData.WritingWin)>0)
	{var WritPercentage = 100 * (UserData.WritingWin)/(UserData.WritingLose + UserData.WritingWin);
		return WritPercentage.toFixed(2) + " %"}
	else {
		return "No Questions Answered"}

};

Template.dashboard.UserLevel = function () {
	UserData = UsersHistory.findOne({"UserID":Meteor.userId()});
	return UserData.Level

};

Template.dashboard.UserBadges = function () {
	UserData = UsersHistory.findOne({"UserID":Meteor.userId()});
	return UserData.BadgeIDs

};