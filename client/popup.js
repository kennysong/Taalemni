Template.popup.SelfPic = function () {
	return "https://graph.facebook.com/"+Meteor.user().services.facebook.username +"/picture?width=200&height=200";
};

Template.popup.events({
	'click #with-friends' : function(){
		console.log("clicked friends!");
		$("#friend-list").slideToggle("slow");
		//friendlibrary = Meteor.user().Friends
	},

	'click #no-friends' : function(){
		console.log("no friends");
		/*Implement global search here*/
	}
});