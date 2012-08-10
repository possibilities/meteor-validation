Package.describe({
  summary: "A smart package for validation"
});

Package.on_use(function (api) {
  // Deps
  api.use('underscore', 'server');
  api.use('model-base', 'server');
  api.use('filters', 'server');
  api.use('livedata', 'client');

  // Vendored
  api.add_files('vendor/underscore.strings.js', ['client', 'server']);
  
  // Core
  api.add_files('common.js', ['client', 'server']);
  api.add_files('validators.js', ['client', 'server']);
  api.add_files('filters.js', 'server');
});

Package.on_test(function (api) {
  api.use('test-helpers', ['client', 'server']);

  api.add_files('tests/common.js', ['client', 'server']);
});
