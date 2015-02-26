'use strict';

var gulp    = require('gulp');
var config  = require('../config').html;

gulp.task('html-dist', function() {
    return gulp.src(config.distSrc)
        .pipe(gulp.dest(config.distDest));
});
