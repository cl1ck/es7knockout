'use strict';

var gulp        = require('gulp');
var del         = require('del');
var builddir    = require('../config').builddir;

gulp.task('clean-build', function (cb) {
    del(builddir, cb);
});
