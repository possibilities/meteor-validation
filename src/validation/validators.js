var shouldBePresent = function(options) {
  options = _.extend({
    messageSuffix: 'is a required field'
  }, options);

  return function(attribute) {
    if (!!!attribute) {
      return options;
    }
  };
};

var shouldBeLongerThan = function(minimumLength, options) {
  options = _.extend({
    messageSuffix: 'must be at least ' + minimumLength + ' characters long'
  }, options);

  return function(attribute) {
    if (!attribute || attribute.length < minimumLength) {
      return options;
    }
  };
};
