/**
 * Deletes the temp directory used in development tasks
 */
'use strict';

var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');

gulp.task('clean-dev', function (cb) {
    del(config.devTempDir, cb);
});
