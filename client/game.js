Template.game.created = function () {
	maxseconds = 20.0;
	seconds = maxseconds;
	timer = setInterval(function() {
	    seconds = seconds - 1;
	    if(seconds < 0) {
	        clearInterval(timer);
	    } else {
	    	console.log(parseInt(100*seconds/maxseconds));
	        $('#time').text(parseInt(seconds));
	        $('.bar').css({'width': parseInt(100*seconds/maxseconds)+'%'});
	    }
	}, 1000);
}

Template.game.SelfScore = function() {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		return CurrentGame.ScoreA;
	} else {
		return CurrentGame.ScoreB;
	}
};

Template.game.OpponentScore = function() {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		return CurrentGame.ScoreB;
	} else {
		return CurrentGame.ScoreA;
	}
};


Template.game.SelfPic = function () {
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=200&height=200";
}

Template.game.OpponentPic = function () {
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

Template.game.QuestionNumber = function () {
	if (!(Session.get('QuestionNumber'))) {
		Session.set('QuestionNumber', 1);
	}
	return Session.get('QuestionNumber');
}

Template.game.Question = function () {
	if (!(Session.get('QuestionNumber'))) {
		Session.set('QuestionNumber', 1);
	}
	QuestionNumber = Session.get('QuestionNumber');
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];

	QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];

	CurrentQ = Question.find(QuestionID).fetch()[0];

	return CurrentQ.Question;
}

Template.game.OptionA = function() {
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];
	QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
	CurrentQ = Question.find(QuestionID).fetch()[0];
	console.log(CurrentQ)
	return CurrentQ.Options['A'];
}

Template.game.OptionB = function() {
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];
	QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
	CurrentQ = Question.find(QuestionID).fetch()[0];

	return CurrentQ.Options['B'];
}

Template.game.OptionC = function() {
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];
	QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
	CurrentQ = Question.find(QuestionID).fetch()[0];

	return CurrentQ.Options['C'];
}

Template.game.OptionD = function() {
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];
	QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
	CurrentQ = Question.find(QuestionID).fetch()[0];

	return CurrentQ.Options['D'];
}

Template.game.OptionE = function() {
	GameID = Session.get('GameID');
	CurrentGame = Game.find(GameID).fetch()[0];
	QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
	CurrentQ = Question.find(QuestionID).fetch()[0];

	return CurrentQ.Options['E'];
}