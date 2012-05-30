Template.withMagic.withMagicDemo = function() {
  return magicDemoForm;
};

var breakWithMagicDemo = function() {
  
  // Kill the validation class by overwriting it
  BookValidator = Model.extend({
    validate: {
      successMessage: "Done, you submitted the broken form!"
    }
  });

  var message = 'Great, you broke it. Try ' + 
                'submitting an invalid form!';
  Session.set('bookErrors', message);
};

Template.withMagic.events = {
  'click .breakAction': function(e) {
    e.preventDefault();
    breakWithMagicDemo();
  },
  'keydown .breakAction': function(e) {

    // Return or space bar on the button 
    // should break the form
    if (_.isSubmitKey(e)) {
      e.preventDefault();
      breakWithMagicDemo();
    }
  }
};
