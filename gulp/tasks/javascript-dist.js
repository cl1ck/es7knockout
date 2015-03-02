'use strict';

var gulp            = require('gulp');
var config          = require('../config').javascript;
var uglify          = require('gulp-uglifyjs');
var shell           = require('gulp-shell');
var runSequence     = require('run-sequence');
var del             = require('del');

gulp.task('jspm:compile',  shell.task(
    ['jspm bundle-sfx ' + config.bundleMain + ' ' + config.dist + '/main.js']
));

gulp.task('jspm:uglify', function() {
    return gulp.src([config.es6runtime, config.dist + '/main.js'])
        .pipe(uglify('app.js', config.uglifySettings))
        .pipe(gulp.dest(config.dist));
});

gulp.task('jspm:cleanup', function(cb) {
    del(config.dist + '/main.*', cb);
});

gulp.task('javascript-dist', function(cb) {
    runSequence(
        'jspm:compile',
        'jspm:uglify',
        'jspm:cleanup',
        cb
    );
});
