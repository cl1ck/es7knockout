var gulp            = require('gulp'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').javascript,
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    cache           = require('gulp-cached');

gulp.task('jshint', function() {
    gulp.src(config.watch)
    .pipe(cache('jshint'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .on('error', handleErrors);
});
