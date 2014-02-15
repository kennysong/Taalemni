Template.leaderboard.heading = function () {
	return "LEADERBOARD";
};

/*Template.list.users = function () {
	return UsersHistory.find({}, {sort: {Level: -1}});
};
*/
function getRandomInt(min,max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function friendInsert(array){
	friendlist = []
	for (var i = 0; i < 20; i++)
		friendlist.push(array[i]["name"], getRandomInt(1,41));
	return friendlist

}
Template.list.users = function(){
	return friendInsert(Meteor.user().Friends);
};



Template.buttons.events({
	'click #friends' : function(){
		$(".leaderboard").slideToggle("slow");
		/*console.log("clicked friends!")*/
		/*Implement switch to friends list here*/
	},

	'click #everyone' : function(){
		$(".leaderboard").slideToggle("slow");
		/*console.log("no friends")*/
		/*Implement global search here*/
	}
});