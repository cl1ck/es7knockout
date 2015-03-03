/**
 * Deletes the build target directory
 */
'use strict';

var gulp    = require('gulp');
var del     = require('del');
var config  = require('../config');

gulp.task('clean-build', function (cb) {
    del(config.buildTargetDir, cb);
});
