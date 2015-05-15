/**
 * Will run all tests using the karma testrunner.
 */
'use strict';

var gulp        = require('gulp');
var karma       = require('karma').server;
var config      = require('../config');

gulp.task('karma', ['clean-reports'], function(cb) {
    karma.start({
        configFile: config.tests.karmaConfig,
        singleRun: true
    }, cb);
});
