Template.popup.SelfPic = function () {
	
	if (!Meteor.user()) {return};
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=200&height=200";
};

Template.popup.friends = function() {
	friends = Meteor.users.find({}, {limit: 10, sort: {Level: -1}});

	return friends
}

Template.popup.events({
	'click #with-friends' : function(){
		console.log("clicked friends!");
		$("#friend-list").slideToggle("slow");
		//friendlibrary = Meteor.user().Friends
	},

	'click #no-friends' : function(){
		console.log("no friends");
		/*Implement global search here*/
	},

	'click .person' : function(e) {

		console.log('person click!')
		console.log(e.currentTarget.id)

		OpponentID = e.currentTarget.id;
		UserID = Meteor.user()._id;

		Questions = Question.find({}, {'limit': 6}).fetch();
		QuestionIDs = [];

		for (i = 0; i < Questions.length; i++) {
			QuestionIDs[i] = Questions[i]._id;
		}

		console.log(QuestionIDs)

		// Create game object

		GameID = Game.insert({'UserIDs':[UserID, OpponentID], 'QuestionIDs':QuestionIDs, 'ScoreA':0, 'ScoreB':0, 
			'ADone':0, 'BDone':0, 'APresent':0, 'BPresent':0});

		Meteor.Router.to('/game/'+GameID);


	}
});