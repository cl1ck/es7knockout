'use strict';

var gulp            = require('gulp');
var config          = require('../config').javascript;
var uglify          = require('gulp-uglifyjs');
var shell           = require('gulp-shell');
var runSequence     = require('run-sequence');
var del             = require('del');

gulp.task('jspm:compile', function() {
    return gulp.src(config.bundleMain + '.js', {read: false})
        .pipe(shell(
            ['jspm bundle-sfx ' + config.bundleMain + ' ' + config.bundleFile]
        ));
});

gulp.task('jspm:uglify', function() {
    return gulp.src([config.bundleFile, config.es6runtime])
        .pipe(uglify(config.uglifyFilename, config.uglifySettings))
        .pipe(gulp.dest(config.dist));
});

gulp.task('jspm:cleanup', function(cb) {
    del(config.dist + '/app.*', cb);
});

gulp.task('javascript-dist', function(cb) {
    runSequence(
        'jspm:compile',
        'jspm:uglify',
        'jspm:cleanup',
        cb
    );
});
