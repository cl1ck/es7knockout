'use strict';

var gulp        = require('gulp');
var del         = require('del');
var distdir     = require('../config').distdir;

gulp.task('clean-dist', function (cb) {
    del(distdir, cb);
});
