var seconds;
var maxseconds;
var timerr;

LogDone = function() {
	console.log('LD')
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;

	CurrentGame = Game.find(GameID).fetch()[0];

	if (UserID == CurrentGame.UserIDs[0]) {
		// Is User A
		console.log('User A Done');
		Game.update(GameID, {$set: {'ADone':1}}, function (a,b) {console.log('done')});

	} else {
		// Is User B
		console.log('User B Done');
		Game.update(GameID, {$set: {'BDone':1}}, function (a,b) {console.log('done')});
	}

	return 0;

}

RunQuestion = function () {
	console.log('RQ')
	maxseconds = 20.0;
	seconds = maxseconds;

	console.log('set timer')

	timerr = Meteor.setInterval(function() {
	    seconds = seconds - 1;
	    if(seconds < 0) {
	    	console.log('clear timer')
	        Meteor.clearInterval(timerr);
	        $('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
			$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
			$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
			$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
			$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});
			LogDone();

	    } else {
	        $('#time').text(parseInt(seconds));
	        $('.bar').css({'width': parseInt(100*seconds/maxseconds)+'%'});
	    }
	}, 1000);
}

NextQuestion = function () {
	console.log('NQ')

	setTimeout(function() {
		$('#time').text("20");
		$('.bar').css({'width': '100%'});

		$('#OptionB').css({'pointer-events': 'auto', 'color': 'black'});
		$('#OptionC').css({'pointer-events': 'auto', 'color': 'black'});
		$('#OptionD').css({'pointer-events': 'auto', 'color': 'black'});
		$('#OptionA').css({'pointer-events': 'auto', 'color': 'black'});
		$('#OptionE').css({'pointer-events': 'auto', 'color': 'black'});
		Session.set('QuestionNumber', Session.get('QuestionNumber')+1);

		RunQuestion();

	}, 1000);
	
	
}



Template.game.rendered = function () {
	if(this._rendered) {
      return 0;
    }

    this._rendered = true;

	GameID = Session.get('GameID');

	Meteor.autorun(function() {

		if (!(Meteor.user())) {
			return 0;
		}

		GameID = Session.get('GameID');
		UserID = Meteor.user()._id;

		CurrentGame = Game.find(GameID).fetch()[0];

		if (CurrentGame && CurrentGame.ADone == 1 && CurrentGame.BDone == 1) {
			console.log('Next Question!')
			console.log('clear timer 2')
			Meteor.clearInterval(timerr);

			if (Session.get('QuestionNumber') == 6) {
				Meteor.Router.to('/end/'+GameID);
				return 0;
			}
			NextQuestion();
			Game.update(GameID, {$set: {'ADone':0, 'BDone':0}});
		}

		if (CurrentGame.APresent == 1 && CurrentGame.BPresent == 1) {
			RunQuestion();
			Game.update(GameID, {$set: {'APresent':0, 'BPresent':0}});

		}
	});

	
	UserID = Meteor.user()._id;

	CurrentGame = Game.find(GameID).fetch()[0];

	if (UserID == CurrentGame.UserIDs[0]) {
		// Is User A
		console.log('User A Present');
		Game.update(GameID, {$set: {'APresent':1}});

	} else {
		// Is User B
		console.log('User B Present');
		Game.update(GameID, {$set: {'BPresent':1}});
	}
}

Template.game.events = {
	'click #OptionA': function() {
		LogDone();
		console.log('clear timer 3')
		Meteor.clearInterval(timerr);

		GameID = Session.get('GameID');
		UserID = Meteor.user()._id;
		CurrentGame = Game.find(GameID).fetch()[0];

		if (!(Session.get('QuestionNumber'))) {
			Session.set('QuestionNumber', 1);
		}
		QuestionNumber = Session.get('QuestionNumber');

		QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
		CurrentQ = Question.find(QuestionID).fetch()[0];
		CurrentA = CurrentQ.Answer;



		if (CurrentA == "A") {
			console.log("CORRECT");
			points = maxseconds + seconds;
			if (CurrentGame.UserIDs[0] == UserID) {
				// Self is User A
				Game.update(GameID, {$inc: {'ScoreA': points}}, function (e,n) {
					console.log('update')
					setTimeout(function() {
						$('#OptionA').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});
					}, 500)
					
				});
			} else {
				// Self is User B
				Game.update(GameID, {$inc: {'ScoreB': points}}, function (e,n) {
					console.log('update')
					setTimeout(function() {
						$('#OptionA').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});
					}, 500)
				});
			}
		} else {
			console.log("INCORRECT");
			console.log('update')
			setTimeout(function() {
				$('#OptionA').css({'color': '#D95C5C'});
				$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});
			}, 500)
		}

	},

	'click #OptionB': function() {
		console.log('clear timer 3')
		Meteor.clearInterval(timerr);

		GameID = Session.get('GameID');
		UserID = Meteor.user()._id;
		CurrentGame = Game.find(GameID).fetch()[0];

		if (!(Session.get('QuestionNumber'))) {
			Session.set('QuestionNumber', 1);
		}
		QuestionNumber = Session.get('QuestionNumber');

		QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
		CurrentQ = Question.find(QuestionID).fetch()[0];
		CurrentA = CurrentQ.Answer;

		LogDone();

		if (CurrentA == "B") {
			console.log("CORRECT");
			points = maxseconds + seconds;
			if (CurrentGame.UserIDs[0] == UserID) {
				// Self is User A
				Game.update(GameID, {$inc: {'ScoreA': points}}, function (e, n) {
					setTimeout(function() {
						$('#OptionB').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});						
					}, 500);

				});
			} else {
				// Self is User B
				Game.update(GameID, {$inc: {'ScoreB': points}}, function (e, n) {
					setTimeout(function() {
						$('#OptionB').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});						
					}, 500);
				});	
			}
		} else {
			console.log("INCORRECT");
			setTimeout(function() {
				$('#OptionB').css({'color': '#D95C5C'});
				$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});						
			}, 500);
		}

	},

	'click #OptionC': function() {
		console.log('clear timer 3')
		Meteor.clearInterval(timerr);

		GameID = Session.get('GameID');
		UserID = Meteor.user()._id;
		CurrentGame = Game.find(GameID).fetch()[0];

		if (!(Session.get('QuestionNumber'))) {
			Session.set('QuestionNumber', 1);
		}
		QuestionNumber = Session.get('QuestionNumber');

		QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
		CurrentQ = Question.find(QuestionID).fetch()[0];
		CurrentA = CurrentQ.Answer;

		LogDone();

		if (CurrentA == "C") {
			console.log("CORRECT");
			points = maxseconds + seconds;
			if (CurrentGame.UserIDs[0] == UserID) {
				// Self is User A
				Game.update(GameID, {$inc: {'ScoreA': points}}, function (e, n) {
					setTimeout(function() {
						$('#OptionC').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});

					}, 500);
					
				});
			} else {
				// Self is User B
				Game.update(GameID, {$inc: {'ScoreB': points}}, function (e, n) {
					setTimeout(function() {
						$('#OptionC').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});

					}, 500);
				});	
			}
		} else {
			console.log("INCORRECT");
			
			setTimeout(function() {
				$('#OptionC').css({'color': '#D95C5C'});
				$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});

			}, 500);
		}
	},

	'click #OptionD': function() {
		console.log('clear timer 3')
		Meteor.clearInterval(timerr);

		GameID = Session.get('GameID');
		UserID = Meteor.user()._id;
		CurrentGame = Game.find(GameID).fetch()[0];

		if (!(Session.get('QuestionNumber'))) {
			Session.set('QuestionNumber', 1);
		}
		QuestionNumber = Session.get('QuestionNumber');

		QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
		CurrentQ = Question.find(QuestionID).fetch()[0];
		CurrentA = CurrentQ.Answer;

		LogDone();

		if (CurrentA == "D") {
			console.log("CORRECT");
			points = maxseconds + seconds;
			if (CurrentGame.UserIDs[0] == UserID) {
				// Self is User A
				Game.update(GameID, {$inc: {'ScoreA': points}}, function (e,n) {
					setTimeout(function() {
						$('#OptionD').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});

					}, 500)

				});
			} else {
				// Self is User B
				Game.update(GameID, {$inc: {'ScoreB': points}}, function (e, n) {
					setTimeout(function() {
						$('#OptionD').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});

					}, 500)
				});	
			}
		} else {
			console.log("INCORRECT");
			setTimeout(function() {
				$('#OptionD').css({'color': '#D95C5C'});
				$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionE').css({'pointer-events': 'none', 'color': 'gray'});

			}, 500)
		}
	},

	'click #OptionE': function() {
		console.log('clear timer 3')
		Meteor.clearInterval(timerr);

		GameID = Session.get('GameID');
		UserID = Meteor.user()._id;
		CurrentGame = Game.find(GameID).fetch()[0];

		if (!(Session.get('QuestionNumber'))) {
			Session.set('QuestionNumber', 1);
		}
		QuestionNumber = Session.get('QuestionNumber');

		QuestionID = CurrentGame.QuestionIDs[QuestionNumber - 1];
		CurrentQ = Question.find(QuestionID).fetch()[0];
		CurrentA = CurrentQ.Answer;

		LogDone();

		if (CurrentA == "E") {
			console.log("CORRECT");
			points = maxseconds + seconds;
			if (CurrentGame.UserIDs[0] == UserID) {
				// Self is User A
				Game.update(GameID, {$inc: {'ScoreA': points}}, function (e,n) {
					setTimeout(function() {
						$('#OptionE').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
					}, 500)

				});
			} else {
				// Self is User B
				Game.update(GameID, {$inc: {'ScoreB': points}}, function (e,n) {
					setTimeout(function() {
						$('#OptionE').css({'color': '#5BBD72', 'pointer-events': 'none'});
						$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
						$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
					}, 500)
				});	
			}
		} else {
			console.log("INCORRECT");

			setTimeout(function() {
				$('#OptionE').css({'color': '#D95C5C'});
				$('#OptionB').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionC').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionD').css({'pointer-events': 'none', 'color': 'gray'});
				$('#OptionA').css({'pointer-events': 'none', 'color': 'gray'});
			}, 500)
		}
	} 
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

Template.game.SelfName = function () {
	return Meteor.user().profile.name.split(' ')[0];

}

Template.game.OpponentName = function () {
	GameID = Session.get('GameID');
	UserID = Meteor.user()._id;
	CurrentGame = Game.find(GameID).fetch()[0];
	if (CurrentGame.UserIDs[0] == UserID) {
		OpponentID = CurrentGame.UserIDs[1];
	} else {
		OpponentID = CurrentGame.UserIDs[0];
	}

	Opponent = Meteor.users.find(OpponentID).fetch()[0];

	return Opponent.profile.name.split(' ')[0];
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