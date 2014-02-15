Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/popup' : 'popup',
  '/game/:id': function(id) {
    Session.set('GameID', id);
    return 'game'
  },
  '/end/:id': function(id) {
  	Session.set('GameID', id);
    return 'end'
  },
  '/dashboard':'dashboard',
  '/leaderboard': 'leaderboard',
  '*': 'error'
});
