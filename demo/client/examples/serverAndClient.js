ProfileValidator = Model.extend({
  validations: {
    errorMessage: "The demo form isn't happy, make " +
                  "things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    validators: {
      firstName: [
        shouldBeMinimumLength(6)
      ],
      lastName: [
        shouldBeMinimumLength(6)
      ],
      about: [
        shouldBeMinimumLength(20)
      ]
    }
  }
});

Template.demo.serverAndClientDemo = function() {
  return new Form({
    name: 'profile',
    classes: 'well'
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
        classes: 'btn-warning',
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
  Session.set('profileSuccess', message);
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
