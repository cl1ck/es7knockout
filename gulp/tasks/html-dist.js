'use strict';

var gulp    = require('gulp');
var config  = require('../config').html;
var ejs     = require('gulp-ejs');

gulp.task('html-dist', function() {
    return gulp.src(config.src)
        .pipe(ejs({
            production: true
        }))
        .pipe(gulp.dest(config.dist));
});
