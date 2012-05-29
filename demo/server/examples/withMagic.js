Meteor.methods({
  validateAndEchoWithMagic: function(formValues) {

    // The validation library will run the validator
    // automatically for you

    // Echo!
    return formValues;
  }
});
