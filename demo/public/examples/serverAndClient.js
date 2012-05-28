ProfileValidator = Model.extend({
  validations: {
    errorMessage: "The client/server demo form isn't " +
                  " happy,make things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    validators: {
      firstName: [
        shouldBeMinimumLength(6)
      ],
      lastName: [
        shouldBeMinimumLength76)
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
      }
    ]
  });
};
