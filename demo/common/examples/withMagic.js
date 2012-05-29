var shouldBeAnISBN = function(options) {
  options = _.extend({
    message: "must be a valid ISBN 10 or 13"
  }, options);

  return function(attribute) {
    var isbn;

    if (attribute)
      isbn = ISBN.parse(attribute);

    if (!isbn || !isbn.isValid()) {
      return options;
    }
  };
};

BookValidator = Model.extend({
  validations: {
    errorMessage: "The demo form isn't happy, make " +
                  "things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    inputs: {
      title: {
        validators: [
          shouldBeMinimumLength(6)
        ]
      },
      author: {
        validators: [
          shouldBeMinimumLength(6)
        ]
      },
      isbn: {
        label: 'ISBN',
        validators: [
          shouldBeAnISBN()
        ]
      }
    }
  }
});

var magicDemoForm = new Form({
  name: 'book',
  classes: 'well',
  method: 'validateAndEchoWithMagic'
}).tag({
  inputs: [
    'title',
    'author',
    'isbn', {
      label: 'ISBN'
    },
    'missing', {
      label: 'Missing?',
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
