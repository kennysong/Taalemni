Meteor.Router.add({
  '/': 'home',
  '/game/:id': function(id) {
    Session.set('GameID', id);
    return 'game'
  },
  '/dashboard':'dashboard',
  '*': 'error'
});