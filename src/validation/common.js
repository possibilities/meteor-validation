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
    var details = _.reduce(self.validations.inputs, self._runValidator, {}, self);

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

  _runValidator: function(details, input, fieldName) {
    var self = this;
    var value, error, message, label;

    // Run each validator
    _.each(input.validators, function(validator) {

      // Get the current value
      value = self[fieldName];
    
      // Run validator on the field
      if (error = validator(value)) {
    
        // Figure out the message
        label = input.label || _.humanize(fieldName);
        message = label + ' ' + error.message;
    
        // Add the error to details
        if (details[fieldName])
          details[fieldName].push(message);
    
        // Add first error to details
        else
          details[fieldName] = [message];
      }
    });

    // return the details
    return details;
  }
});
