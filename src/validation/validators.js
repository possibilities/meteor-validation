var shouldBePresent = function(options) {
  options = _.extend({
    message: 'is a required field'
  }, options);

  return function(attribute) {

    if (!!!attribute) {
      return options;
    }
  };
};

var shouldBeMinimumLength = function(minimumLength, options) {
  options = _.extend({
    message: 'must be at least ' + minimumLength + ' characters long'
  }, options);

  return function(attribute) {
    if (!attribute || attribute.length < minimumLength) {
      return options;
    }
  };
};
