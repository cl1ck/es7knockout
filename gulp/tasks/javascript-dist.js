'use strict';

var gulp        = require('gulp');
var config      = require('../config').javascript;
var uglify      = require('gulp-uglifyjs');

gulp.task('javascript-dist', function() {
    gulp.src(config.distSrc)
    .pipe(uglify('main.js', config.uglifyOptions))
    .pipe(gulp.dest(config.distDest));
});
