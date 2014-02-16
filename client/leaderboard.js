Template.leaderboard.heading = function () {
	return "LEADERBOARD";
};

/*Template.list.users = function () {
	return UsersHistory.find({}, {sort: {Level: -1}});
};
*/

Template.Everyone.users = function(){
	// friendInsert(Meteor.user);
	return Meteor.users.find({}, {sort: {Level: -1}});
};


Template.Friends.users = function(){
	// friendInsert(Meteor.user);
	return Meteor.users.find({}, {sort: {Level: -1}});
};

Template.buttons.events({
	'click #friends' : function(){
		$(".leaderboard").slideToggle("slow");
		UserList();
		/*console.log("clicked friends!")*/
		/*Implement switch to friends list here*/
	},

	'click #everyone' : function(){
		$(".leaderboard").slideToggle("slow");
		/*console.log("no friends")*/
		/*Implement global search here*/
	}
});
