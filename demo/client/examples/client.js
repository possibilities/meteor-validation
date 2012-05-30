var shouldNotContainFuck = function(options) {
  options = _.extend({
    message: "cannot be 'fuck'. Great word " +
             "but not appropriate for the demo (;"
  }, options);

  return function(attribute) {
    if (attribute && /fuck/.test(attribute.toLowerCase())) {
      return options;
    }
  };
};

ClientDemoValidator = Model.extend({
  validate: {
    errorMessage: "The client demo form isn't happy, " +
                  "make things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    inputs: {
      title: {
        validators: [
          shouldNotContainFuck(),
          shouldBeLongerThan(6)
        ]
      },
      body: {
        validators: [
          shouldBeLongerThan(10)
        ]
      },
      section: {
        validators: [
        shouldBeLongerThan(2)
        ]
      }
    }
  }
});

Template.demo.clientDemo = function() {
  return new Form({
    name: 'clientDemo',
    classes: 'well',
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
