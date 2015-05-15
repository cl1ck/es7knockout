/**
 * Deletes the reports directory
 */
'use strict';

var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');
var fs      = require('fs');

gulp.task('clean-reports', function (cb) {
    del(config.tests.reportDir, function() {
        fs.mkdir(config.tests.reportDir, cb)
    });
});
