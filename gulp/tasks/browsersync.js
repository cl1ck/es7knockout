'use strict';

var browsersync = require('browser-sync');
var gulp        = require('gulp');
var config      = require('../config').browsersync;
var open        = require('open');

gulp.task('browsersync', function() {
    browsersync.init(config);
    open('http://localhost:' + config.port);
});
