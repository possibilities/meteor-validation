Template.demo.withMagicDemo = function() {
  return magicDemoForm;
};

var breakClientValidation = function() {
  
  // Override the validation class with no validations
  BookValidator = Model.extend({
    validate: {
      successMessage: "Done, you submitted the broken form!"
    }
  });

  var message = 'Great, you broke it. Try ' + 
                'submitting an invalid form!';
  Session.set('bookErrors', message);
};

Template.demo.events = {
  'click .breakAction': function(e) {
    e.preventDefault();
    breakClientValidation();
  },
  'keydown .breakAction': function(e) {

    // TODO add method _.isSubmitKey(e)
    // Return or space bar on the button 
    // should break the form
    if (_.isSubmitKey(e)) {
      e.preventDefault();
      breakClientValidation();
    }
  }
};
