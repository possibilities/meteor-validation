_.mixin(_.string.exports());

Validation = {
  Error: function(error) {
    var message = error.message || 'There was a problem processing your request';
    return new Meteor.Error(422, message, error.details)
  }
};
Validation.Error.prototype = new Meteor.Error();

Model.registerPlugin({
  isValid: function() {
    var self = this;

    // Run validator
    var details = _.reduce(self.validations.validators, self._runValidator, {}, self);

    // If we have errors bail out
    if (!_.isEmpty(details))
      self.errors = new Validation.Error({
        message: self.validations.errorMessage,
        details: details
      });

    // No errors
    else
      return true;
  },

  _runValidator: function(details, validations, fieldName) {
    var self = this;
    var value, error;

    // Run each validator
    _.each(validations, function(validator) {

      // Get the current value
      value = self[fieldName];

      // Run validator on the field
      if (error = validator(fieldName, value)) {

        // Add the error to details
        if (details[fieldName])
          details[fieldName].push(error);

        // Add first error to details
        else
          details[fieldName] = [error];
      }
    });

    // return the details
    return details;
  }
});
