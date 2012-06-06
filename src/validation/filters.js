// This is the filter we add to the targeted method
ValidationFilters = {
  validationFilter: function validationFilter(name) {
    return function(form) {

      var validator;
      var validatorClass;
      var modelClass;

      // Figure out the validator class
      if (form._modelName) {
        modelClass = _.constantize(form._modelName);
        validator = new modelClass(form);
      } else {
        validatorClass = _.constantize(name + 'Validator');
        validator = new validatorClass(form);
      }

      // Check it out!
      if (!validator.isValid())
        throw validator.errors;
    
      if (modelClass)
        return validator;
      else
        return form;
    }
  }
};
