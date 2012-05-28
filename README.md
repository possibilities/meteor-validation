# Meteor Validation

A smart package for validating meteor-forms (and POJOs)

## Usage

    User = Model.extend({
      fullName: function() { 
        return this.firstName + ' ' + this.lastName
      }
    });

    var invalidUser = new User({
      firstName: 'Mike',
      lastName: 'Lombardo',
      validations: {
        firstName: [
          shouldBeMinimumLength(20)
        ]
      }
    });

    var validUser = new User({
      firstName: 'Mike',
      lastName: 'Lombardo',
      validations: {
        firstName: [
          shouldBeMinimumLength(2)
        ]
      }
    });

    invalidUser.isValid();  // false
    invalidUser.errors;     // ['First name must be at least 20 characters long']));
    validUser.isValid();    // true

# TODO

Add the ability to call validations with a config object like this:

self.validations({
  common: {},
  server: {},
  client: {}
});
