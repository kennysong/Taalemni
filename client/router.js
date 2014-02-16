Meteor.Router.add({
  '/': 'home',
  '/about': function() {
    console.log('asdf')
    console.log($('#about'))
    $('.navitem').removeClass('active');
    $('#about').addClass('active');
    return 'about'
  },
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
