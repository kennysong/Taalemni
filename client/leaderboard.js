Template.leaderboard.heading = function () {
	return "LEADERBOARD";
};

Template.list.users = function () {
	return UsersHistory.find({}, {sort: {Level: -1}});
};



Template.buttons.events({
	'click #friends' : function(){
		/*console.log("clicked friends!")*/
		/*Implement switch to friends list here*/
				

	},

	'click #everyone' : function(){
		/*console.log("no friends")*/
		/*Implement global search here*/
	}
});