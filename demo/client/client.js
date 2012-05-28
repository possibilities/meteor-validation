Template.demo.code = function(form) {
  var name = form.tag.name + 'Form';
  Meteor.defer(prettyPrint);
  return Session.get(name);
};

Meteor.startup(function() {
  Meteor.http.get('/examples/client.js', function(err, result) {
    if (!err) {
      Session.set('clientDemoForm', result.content);
    }
  });
  Meteor.http.get('/examples/serverAndClient.js', function(err, result) {
    if (!err) {
      Session.set('profileForm', result.content);
    }
  });
});

// Get github fork me graphic loaded. Found that client subscriptions sometimes
// don't start if the image is in the DOM from the start.
Meteor.defer(function() {
  $forkMe = $('img.forkMe');
  var src = $forkMe.data('src');
  $forkMe.attr('src', src);
});
