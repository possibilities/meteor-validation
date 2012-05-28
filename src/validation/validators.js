var shouldBePresent = function(options) {
  var self = this;
  var defaultOptions = {
    message: 'is a required field'
  };
  options = _.extend(defaultOptions, options);

  return function(name, attribute) {

    if (!!!attribute) {
      return _.humanize(name) + ' ' + options.message;
    }
  };
};

var shouldBeMinimumLength = function(minimumLength, options) {
  var self = this;

  var defaultOptions = {
    message: 'must be at least ' + minimumLength + ' characters long'
  };
  options = _.extend(defaultOptions, options);

  return function(name, attribute) {
    if (!attribute || attribute.length < minimumLength) {
      return _.humanize(name) + ' ' + options.message;
    }
  };
};
