'use strict';

var gulp = require('gulp');
var config = require('../config').jade;
var jade = require('gulp-jade');

gulp.task('jade', function() {
    return gulp.src(config.src)
        .pipe(jade())
        .pipe(gulp.dest(config.dest));
});
