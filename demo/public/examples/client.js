ClientDemoValidator = Model.extend({
  validations: {
    errorMessage: "The client demo form isn't happy, " +
                  "make things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    validators: {
      title: [
        shouldBeMinimumLength(6)
      ]
    }
  }
});

Template.demo.clientDemo = function() {
  return new Form({
    name: 'clientDemo',
    classes: 'well'
  }).tag({
    inputs: [
      'title',
      'body', {
        as: 'textarea',
        hint: 'Some help text about the field'
      },
      'section',
      'category',
      'allow_comments', {
        label: 'Allow commenting on this story',
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
