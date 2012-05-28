var shouldBePresent = function(options) {
  var self = this;

  options = _.extend({
    message: 'is a required field'
  }, options);

  return function(name, attribute) {

    if (!!!attribute) {
      return _.humanize(name) + ' ' + options.message;
    }
  };
};

var shouldBeMinimumLength = function(minimumLength, options) {
  var self = this;

  options = _.extend({
    message: 'must be at least ' + minimumLength + ' characters long'
  }, options);

  return function(name, attribute) {
    if (!attribute || attribute.length < minimumLength) {
      return _.humanize(name) + ' ' + options.message;
    }
  };
};
