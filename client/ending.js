Handlebars.registerHelper('each_with_index', function(items, options) {
  var out = '';
  for(var i=0, l=items.length; i<l; i++) {
    var key = 'Branch-' + i;
    out = out + Spark.labelBranch(key,function(){ 
      options.fn({data: items[i], index: i});
    });
  }

  return out;
});

Template.end.SelfScore = function() {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		return CurrentGame.ScoreA;
	} else {
		return CurrentGame.ScoreB;
	}
};

Template.end.OpponentScore = function() {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		return CurrentGame.ScoreB;
	} else {
		return CurrentGame.ScoreA;
	}
};

Template.end.Message = function () {
	if (Template.end.OpponentScore() > Template.end.SelfScore()) {
		return "You lost!";
	} else {
		return "You win!"
	}
}

Template.end.SelfPic = function () {
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=200&height=200";
}

Template.end.OpponentPic = function () {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		OpponentID = CurrentGame.UserIDs[1];
	} else {
		OpponentID = CurrentGame.UserIDs[0];
	}

	Opponent = Meteor.users.find(OpponentID).fetch()[0];

	return "https://graph.facebook.com/"+Opponent.services.facebook.username +"/picture?width=200&height=200";

}

Template.end.SelfName = function () {
	return Meteor.user().profile.name;

}

Template.end.OpponentName = function () {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		OpponentID = CurrentGame.UserIDs[1];
	} else {
		OpponentID = CurrentGame.UserIDs[0];
	}

	Opponent = Meteor.users.find(OpponentID).fetch()[0];

	return Opponent.profile.name;
}

Template.end.Questions = function () {
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];
	Qs = [];

	for (i = 0; i < CurrentGame.QuestionIDs.length; i++) {
		Q = Question.find(CurrentGame.QuestionIDs[i]).fetch()[0];
		Q['index'] = i + 1;
		Qs.push(Q);
	}

	return Qs;

}

Template.end.rendered = function() {

	Deps.autorun(function () {
		GameID = Session.get('GameID');
		CurrentGame = Game.find(GameID).fetch()[0];

		for (i = 1; i <= CurrentGame.QuestionIDs.length; i++) {
			Q = Question.find(CurrentGame.QuestionIDs[i]).fetch()[0];
			console.log(Q)
			console.log('.'+i+' #Option'+Q.Answer);
			$('.'+i+' #Option'+Q.Answer).css({'color': '#5BBD72'});
		}

	});
}