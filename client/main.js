
Template.navbar.events({
'click #logout-btn' : function(){
	console.log("Why not")
	Meteor.logout();
	Meteor.Router.to('/');

}})

