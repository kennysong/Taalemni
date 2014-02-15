Template.leaderboard.heading = function () {
	return "Leaderboard";
};

Template.list.users = function () {
	return UsersHistory.find({}, {sort: {Level: -1}});

};


