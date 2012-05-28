ProfileValidator = Model.extend({
  validations: {
    errorMessage: "The demo form isn't happy, make " +
                  "things right and try again!",
    successMessage: "Great, you made a happy form, " +
                    "Try it again!",
    validators: {
      firstName: [
        shouldBeMinimumLength(6)
      ],
      lastName: [
        shouldBeMinimumLength(6)
      ],
      about: [
        shouldBeMinimumLength(20)
      ]
    }
  }
});
