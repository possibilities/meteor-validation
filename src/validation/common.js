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
    self._error_details = {};
    _.each(self.validations.validators, function(validations, fieldName) {
      self._fieldValidator(validations, fieldName)
    });
    if (!_.isEmpty(self._error_details)) {
      self.errors = new Validation.Error({
        message: self.validations.errorMessage,
        details: self._error_details
      });
      return false;
    }
    delete self._errors_details;
    return true;
  },

  _fieldValidator: function(validations, fieldName) {
    var self = this;
    var value, error;
    _.each(validations, function(validator) {
      value = self[fieldName];
      if (error = validator(fieldName, value)) {
        self._error_details[fieldName] || (self._error_details[fieldName] = [])
        self._error_details[fieldName].push(error);
      }
    });
  }
});
