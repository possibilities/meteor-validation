Template.demo.serverAndClientDemo = function() {
  return new Form({
    name: 'profile',
    classes: 'well',
    method: 'validateAndEcho',
    inputs: [
      'firstName',
      'lastName',
      'about', {
        as: 'textarea'
      },
      'awesome', {
        label: 'Are you awesome?',
        as: 'checkbox'
      }
    ],
    actions: [
      'cancel',
      'submit', {
        label: 'Save'
      },
      'break', {
        classes: 'btn-danger',
        label: 'Break client side validations'
      }
    ]
  });
};

var breakClientValidation = function() {
  
  // Override the validation class with no validations
  ProfileValidator = Model.extend({
    validate: {
      successMessage: "Done, you submitted the broken form!"
    }
  });

  var message = 'Great, you broke it. Try ' + 
                'submitting an invalid form!';
  Session.set('profileErrors', message);
};

Template.demo.events = {
  'click .breakAction': function(e) {
    e.preventDefault();
    breakClientValidation();
  },
  'keydown .breakAction': function(e) {

    // Return or space bar on the button 
    // should break the form
    if (_.isSubmitKey(e)) {
      e.preventDefault();
      breakClientValidation();
    }
  }
};
