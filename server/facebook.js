obj_array = []
function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me');
}

Facebook.prototype.FindFriends = function() {
    return this.query('/me/friends');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    }, 

    FindFriends: function() {   
	    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
	    console.log(fb)
	    var data = fb.FindFriends();
	    console.log(data)

        id = Meteor.user()._id;
        console.log("Logged in: " + id)
        Meteor.users.update(id, {$set: {'BadgeIDs': [], 'Level': 1, 'MathWin': 0, 'MathLose': 0, 
            'ReadingWin': 0, 'ReadingLose': 0, 'WritingWin': 0, 'WritingLose': 0, 'Friends':data['data']}});
        friendInsert();
    }
});

//Publish the custom properties fields in Mongo
Meteor.publish("userData", function() {
    return Meteor.users.find({_id : this.userId}, {fields: {
        'BadgeIDs': 1,'Level': 1,'MathWin': 1,'MathLose':1, 'ReadingWin':1,'ReadingLose':1, 'WritingWin':1, 'WritingLose':1,'Friends':1
    }});
});

//Publish the Level of field
Meteor.publish("levelData", function() {
    return Meteor.users.find({}, {fields: {
        'Level': 1, "name" : 1
    }});
});

//Add friends to users Collection
friendInsert = function() {
    for (var i = 0; i < 30; i++)
        if (Meteor.users.find({"profile":{"name":Meteor.user().Friends[i].name}}).count() == 0) {
            id = Meteor.users.insert({"profile":{"name":Meteor.user().Friends[i].name}, "Level": getRandomInt(1,41)});
            console.log(id)
        };
};

getRandomInt = function(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};