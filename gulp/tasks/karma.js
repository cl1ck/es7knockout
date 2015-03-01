'use strict';

var gulp        = require('gulp');
var karma       = require('karma').server;
var config      = require('../config').tests;

gulp.task('karma', function(cb) {
    karma.start({
        configFile: config.karmaConfig,
        singleRun: true
    }, cb);
});
