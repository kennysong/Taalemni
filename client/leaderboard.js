Template.leaderboard.heading = function () {
	return "Leaderboard";
};

Users = new Meteor.Collection("users")

Template.leaderboard.users = function () {
	return Users.find({}, {sort: {Level: -1}});

};


