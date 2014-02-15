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
		return MathPercentage.toFixed(2) + " % Correct"}
	else {
		console.log("something")
		return "No Questions Answered"}

};

Template.dashboard.ReadWinPercentage = function () {
	if ((Meteor.user().ReadingLose + Meteor.user().ReadingWin)>0)
	{var ReadPercentage = 100 * (Meteor.user().ReadingWin)/(Meteor.user().ReadingLose + Meteor.user().ReadingWin);
		return ReadPercentage.toFixed(2) + " % Correct"}
	else {
		return "No Questions Answered"}

};

Template.dashboard.WritWinPercentage = function () {
	if ((Meteor.user().WritingLose + Meteor.user().WritingWin)>0)
	{var WritPercentage = 100 * (Meteor.user().WritingWin)/(Meteor.user().WritingLose + Meteor.user().WritingWin);
		return WritPercentage.toFixed(2) + " % Correct"}
	else {
		return "No Questions Answered"}

};

Template.dashboard.UserLevel = function () {
	return Meteor.user().Level;

};

Template.dashboard.UserBadges = function () {
<<<<<<< HEAD
	var badges = [{"class": "star circular icon link", "title": "You managed to defeat an opponent!"},
	{'class': "heart circular icon link", 'title': "You bested 5 foes"}]
	var UserData = Meteor.user();
	var TotalWins = UserData.MathWin + UserData.ReadingWin + UserData.WritingWin;
	if (TotalWins > 5){
		return [badges[0], badges[1]];
	}
	else if (TotalWins > 1) {
		return [[badges[0]]];
	};	
};
=======
	return Meteor.user().BadgeIDs
>>>>>>> 2adb69c00a94f759aeeba62684592af6705a333d

