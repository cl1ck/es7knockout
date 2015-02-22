'use strict';

var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var config     = require('../config').images;

gulp.task('images', function() {
    gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest));
});
