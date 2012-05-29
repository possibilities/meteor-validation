Template.demo.withMagicDemo = function() {
  return new Form({
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
};

var breakClientValidation = function() {
  
  // Override the validation class with no validations
  BookValidator = Model.extend({
    validations: {
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
    if (e.keyCode === 13 || e.keyCode === 32) {
      e.preventDefault();
      breakClientValidation();
    }
  }
};
