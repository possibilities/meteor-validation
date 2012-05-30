var code = function(form, env) {
  var name = _.camelize(form.name + '_' + env + '_form');
  Meteor.defer(prettyPrint);
  return Session.get(name);
};

Template.demo.clientCode = function(form) {
  return code(form, 'client');
};

Template.demo.serverCode = function(form) {
  return code(form, 'server');
};

Template.demo.commonCode = function(form) {
  return code(form, 'common');
};

Meteor.startup(function() {
  Meteor.http.get('/_examples/client/client.js', function(err, result) {
    if (!err) {
      Session.set('clientDemoClientForm', result.content);
    }
  });
  Meteor.http.get('/_examples/client/serverAndClient.js', function(err, result) {
    if (!err) {
      Session.set('profileClientForm', result.content);
    }
  });
  Meteor.http.get('/_examples/server/serverAndClient.js', function(err, result) {
    if (!err) {
      Session.set('profileServerForm', result.content);
    }
  });
  Meteor.http.get('/_examples/common/withMagic.js', function(err, result) {
    if (!err) {
      Session.set('bookCommonForm', result.content);
    }
  });
  Meteor.http.get('/_examples/client/withMagic.js', function(err, result) {
    if (!err) {
      Session.set('bookClientForm', result.content);
    }
  });
  Meteor.http.get('/_examples/server/withMagic.js', function(err, result) {
    if (!err) {
      Session.set('bookServerForm', result.content);
    }
  });
  Meteor.http.get('/_examples/common/withMagic.js', function(err, result) {
    if (!err) {
      Session.set('bookCommonForm', result.content);
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
