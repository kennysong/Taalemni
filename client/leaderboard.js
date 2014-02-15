Template.leaderboard.heading = function () {
	return "Leaderboard";
};


Template.leaderboard.users = function () {
	return Users.find({}, {sort: {Level: -1}});

};


