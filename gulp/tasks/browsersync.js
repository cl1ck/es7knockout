'use strict';

var browsersync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config').browsersync;

gulp.task('browsersync', ['build'], function(cb) {
    browsersync.init(config);
    cb();
});
