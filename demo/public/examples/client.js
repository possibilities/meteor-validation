var shouldNotContainFuck = function(options) {
  var self = this;
  var defaultOptions = {
    message: "cannot be 'fuck'. Great word but not appropriate for the demo (;"
  };
  options = _.extend(defaultOptions, options);

  return function(name, attribute) {
    if (attribute && /fuck/.test(attribute.toLowerCase())) {
      return _.humanize(name) + ' ' + options.message;
    }
  };
};

ClientDemoValidator = Model.extend({
  validations: {
    errorMessage: "The client demo form isn't happy, " +
                  "make things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    validators: {
      title: [
        shouldNotContainFuck(),
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
