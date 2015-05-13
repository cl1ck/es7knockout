/**
 * Deletes the reports directory
 */
'use strict';

var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');

gulp.task('clean-reports', function (cb) {
    del(config.tests.reportDir, cb);
});
