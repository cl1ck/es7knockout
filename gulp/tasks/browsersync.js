/**
 * Starts BrowserSync
 */
'use strict';

var browsersync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config');

gulp.task('browsersync', ['precompile-dev'], function(cb) {
    browsersync.init(config.browsersync);
    cb();
});
