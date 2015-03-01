'use strict';

var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config').images;

gulp.task('images-dist', function() {
    return gulp.src(config.src)
    .pipe(imagemin(config.settings))
    .pipe(gulp.dest(config.dist));
});
