_.mixin(_.string.exports());

_.mixin({
  isSubmitKey: function(e) {
    return e.keyCode === 13 || e.keyCode === 32;
  }
});

Validation = {
  Error: function(error) {
    var message = error.message || 'There was a problem processing your request';
    return new Meteor.Error(422, message, error.details)
  }
};
Validation.Error.prototype = new Meteor.Error();

Model.extension({
  initialize: function(attributes) {
    _.extend(this, attributes);
  },

  isValid: function() {
    var self = this;

    // Run validator
    var details = _.reduce(self.validate.inputs, self._runValidator, {}, self);
    
    // No errors
    if (_.isEmpty(details)) {
      return true;

    // We have errors
    } else {
      self.errors = new Validation.Error({
        message: self.validate.errorMessage,
        details: details
      });
      return false;
    }
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
        if (!error.message) {
          label = input.label || _.humanize(fieldName);
          error.message = label + ' ' + error.messageSuffix;
        }
    
        // Add the error to details
        if (details[fieldName])
          details[fieldName].push(error.message);
    
        // Add first error to details
        else
          details[fieldName] = [error.message];
      }
    });

    // return the details
    return details;
  }
});
