question_list = [
    {
        "Category": "Critical Reading", 
        "Answer": "B", 
        "Explanation": "Because", 
        "Question": "Despite ------- on taking rare tamarins from their habitat, the illegal trade in the tiny monkeys remains -------.", 
        "Options": {
            "A": "commendations . . obligatory", 
            "C": "restrictions . . local", 
            "B": "consultations . . predominant", 
            "E": "prohibitions . . active", 
            "D": "penalties . . illicit"
        }
    }, 
    {
        "Category": "Critical Reading", 
        "Answer": "C", 
        "Explanation": "Because", 
        "Question": "Representing a round world on a flat surface is impossible without some -------: the Mercator projection map shows Greenland as over ten times larger than Mexico, a country in fact only slightly smaller than Greenland.", 
        "Options": {
            "A": "oversight", 
            "C": "distortion", 
            "B": "simplification", 
            "E": "superficiality", 
            "D": "sophistication"
        }
    }, 
    {
        "Category": "Mathematics", 
        "Answer": "C", 
        "Explanation": "Because", 
        "Question": "In a community of 416 people, each person owns a dog or a cat or both. If there are 316 dog owners and 280 cat owners, how many of the dog owners own no cat?", 
        "Options": {
            "A": "36", 
            "C": "136", 
            "B": "100", 
            "E": "316", 
            "D": "180"
        }
    }, 
    {
        "Category": "Critical Reading", 
        "Answer": "D", 
        "Explanation": "", 
        "Question": "Since we have many cornfields in this city, we do not have to _____ corn. ", 
        "Options": {
            "A": "distribute", 
            "C": "contain", 
            "B": "develop", 
            "E": "eat", 
            "D": "import"
        }
    }, 
    {
        "Category": "Critical Reading", 
        "Answer": "E", 
        "Explanation": "Because", 
        "Question": "Unfortunately, many times insurance companies do not insure the person who really may ____ the insurance.", 
        "Options": {
            "A": "sanctify", 
            "C": "consider", 
            "B": "appeal", 
            "E": "need", 
            "D": "renege"
        }
    }, 
    {
        "Category": "Critical Reading", 
        "Answer": "D", 
        "Explanation": "", 
        "Question": "I never can tolerate a situation which is ____, in other words, where nothing seems to go anywhere.", 
        "Options": {
            "A": "abrupt", 
            "C": "uncontrollable", 
            "B": "uncomfortable", 
            "E": "pliant", 
            "D": "static"
        }
    }
];

Question = new Meteor.Collection("question")

if (Question.find().count() == 0) {
    for (var i = 0; i < question_list.length; i++) {
        console.log(question_list[i]);
        Question.insert(question_list[i]);
    }
}

game_list = [
	{
		"QuestionIDs": ["x3h4PaqMpJFR7t5KA", "nPDRnXEztBWfMmqxx", "9S4WmuqGXWfJNGNBy", "qnHRs5ufFY4ZCBWgN", "uDYDgfEXr8xZiCJBp", "95b87ZcNqZ2c636Hg"],
		"UserIDs": ["nnX2HQ4qnvCDoNKou", "9jNFCCh5EHhJcgFfH"],
		"ScoreA": 0,
		"ScoreB": 0
	}
];

Game = new Meteor.Collection("game")

if (Game.find().count() == 0) {
	for (var i = 0; i < game_list.length; i++) {
        console.log(game_list[i]);
        Game.insert(game_list[i]);
    }

}


user_list = [
    {
        "UserID":"1",
        "Level":"3",
        "BadgeIDs":["323", "4332"],
        "MathWin":"10",
        "MathLose":"0",
        "ReadingWin":"5",
        "ReadingLose":"5",
        "WritingWin":"3",
        "WritingLose":"7",
    },
    {
        "UserID":"2",
        "Level":"19",
        "BadgeIDs":["33", "433"],
        "MathWin":"10",
        "MathLose":"0",
        "ReadingWin":"6",
        "ReadingLose":"4",
        "WritingWin":"9",
        "WritingLose":"1"
    },
    {
        "UserID":"3",
        "Level":"5",
        "BadgeIDs":["3", "32"],
        "MathWin":"9",
        "MathLose":"1",
        "ReadingWin":"5",
        "ReadingLose":"5",
        "WritingWin":"2",
        "WritingLose":"8"
    }

]

Users = new Meteor.Collection("users")

if (Users.find().count() == 0) {
    for (var i = 0; i < user_list.length; i++) {
        console.log(user_list[i]);
        Users.insert(user_list[i]);
    }
}
