Meteor.Router.add({
  '/': 'home',
  '/about': function () {
    console.log('asdf')
    $('.navitem').removeClass('active');
    console.log("#about");
    $('#about').addClass('active');
    console.log("#about");
    return 'about';
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