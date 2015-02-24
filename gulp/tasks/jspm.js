var gulp            = require('gulp');
var config          = require('../config').javascript;
var shell           = require('gulp-shell');
var handleErrors    = require('../handleErrors');

gulp.task('jspm:copyRuntime', function() {
    return gulp.src(config.es6runtime)
    .pipe(gulp.dest(config.dest));
});

gulp.task('jspm', ['jspm:copyRuntime'], function() {
    return gulp.src(config.bundleMain + '.js', {read: false})
    .pipe(shell(['jspm bundle-sfx ' + config.bundleMain + ' ' + config.bundleFile])) // + '  &>/dev/null'
    .on('error', handleErrors);
});
