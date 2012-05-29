Meteor.methods({
  validateAndEchoWithMagic: function(formValues) {

    // Wrap the incoming form values in the validator
    var bookValidator = new BookValidator(formValues);

    // Validate form
    if (!bookValidator.isValid())

      // `Validator.errors` is a Meteor error
      // that can be thrown across the wire
      throw bookValidator.errors;

    // Do smart things with valid objects here!
    
    // Echo!
    return formValues;
  }
});
