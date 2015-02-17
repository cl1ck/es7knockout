var browsersync = require('browser-sync'),
    gulp        = require('gulp'),
    config      = require('../config').browsersync;

gulp.task('browsersync', function() {
  browsersync.init(config);
});
