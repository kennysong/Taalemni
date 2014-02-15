Template.leaderboard.heading = function () {
	return "Leaderboard";
};

Users = new Meteor.Collection("users_history")

Template.leaderboard.users = function () {
	return Users.find({}, {sort: {Level: -1}});

};


