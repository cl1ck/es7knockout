var gulp    = require('gulp');
var config  = require('../config').javascript;

gulp.task('javascript-prepare', function() {
    gulp.src(config.es6runtime)
    .pipe(gulp.dest(config.dest));
});

gulp.task('javascript', ['jshint', 'jscs', 'jspm']);
