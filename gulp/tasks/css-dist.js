'use strict';

var gulp    = require('gulp');
var minify  = require('gulp-minify-css');
var config  = require('../config').sass;

gulp.task('css-dist', function() {
    return gulp.src(config.distSrc)
        .pipe(minify())
        .pipe(gulp.dest(config.distDest));
});
