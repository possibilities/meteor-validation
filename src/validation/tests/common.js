Tinytest.add("validation", function (test) {

  User = Model.extend({
    validations: {
      errorMessage: 'Yo, try again!',
      inputs: {
        firstName: {
          validators: [
            shouldBeMinimumLength(6)
          ]
        }
      }
    },
    fullName: function() { 
      return this.firstName + ' ' + this.lastName
    }
  });

  var invalidUser = new User({
    firstName: 'Mike',
    lastName: 'Lombardo'
  });

  var validUser = new User({
    firstName: 'Michael',
    lastName: 'Lombardo'
  });

  // isValid should return false if all the conditions are not met
  test.isFalse(invalidUser.isValid());

  // If a model is invalid we should get an array of error messages
  test.isTrue(_.isEqual(invalidUser.errors.details.firstName, ['First name must be at least 6 characters long']));

  // The error should have a custom reason
  test.isTrue(_.isEqual(invalidUser.errors.reason, 'Yo, try again!'));

  // isValid should return true if all the conditions are met
  test.isTrue(validUser.isValid());
  
  FunkyUser = Model.extend({
    validations: {
      inputs: {
        firstName: {
          label: 'Funky first name',
          validators: [
            shouldBeMinimumLength(6)
          ]
        }
      }
    }
  });

  var invalidUser = new FunkyUser({
    firstName: 'Mike',
    lastName: 'Lombardo'
  });

  invalidUser.isValid();
  test.isTrue(_.isEqual(invalidUser.errors.details.firstName, ['Funky first name must be at least 6 characters long']));
  
});
