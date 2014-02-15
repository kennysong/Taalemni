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

function friendInsert(array){ /*Meteor.user*/
	for (var i = 0; i < 30; i++)
		if (array.find({"profile":{"name":array().Friends[i].name}}).count() == 0) {
			id = array.insert({"profile":{"name":array().Friends[i]}, "Level":getRandomInt(1,41)});
		};
};

Template.list.users = function(){
	friendInsert(Meteor.user);
	return Meteor.users.find({}, {sort: {Level: -1}});
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
