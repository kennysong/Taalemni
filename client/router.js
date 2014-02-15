Meteor.Router.add({
  '/': 'home',
  '/about': 'about',
  '/game/:id': function(id) {
    Session.set('GameID', id);
    return 'game'
  },
  '/dashboard':'dashboard',
  '/leaderboard': 'leaderboard',
  '*': 'error'
});