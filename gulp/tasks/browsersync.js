var browsersync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config').browsersync;

gulp.task('browsersync', function() {
    browsersync.init(config);
});
