'use strict';

var gulp        = require('gulp');
var openBrowser = require('open');
var config      = require('../config');

gulp.task('default', ['watch'], function() {
    if (config.openBrowser) {
        openBrowser('http://localhost:' + config.styleguide.port);
        openBrowser('http://localhost:' + config.browsersync.port);
    }
});
