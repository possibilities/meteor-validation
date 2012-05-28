Template.demo.serverAndClientDemo = function() {
  return new Form({
    name: 'profile',
    classes: 'well',
    method: 'validateAndEcho'
  }).tag({
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
    validations: {
      successMessage: "Done, you submitted the broken form!"
    }
  });

  var message = 'Great, you broke it. Try ' + 
                'submitting an invalid form!';
  Session.set('profileError', message);
};

Template.demo.events = {
  'click .breakAction': function(e) {
    e.preventDefault();
    breakClientValidation();
  },
  'keydown .breakAction': function(e) {

    // Return or space bar on the button 
    // should break the form
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      breakClientValidation();
    }
  }
};
