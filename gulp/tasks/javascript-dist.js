'use strict';

var gulp            = require('gulp');
var config          = require('../config').javascript;
var uglify          = require('gulp-uglify');
var shell           = require('gulp-shell');
var runSequence     = require('run-sequence');
var del             = require('del');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');

gulp.task('jspm:compile',  shell.task(
    ['jspm bundle-sfx ' + config.bundleMain + ' ' + config.dist + '/main.js']
));

gulp.task('jspm:uglify', function() {
    return gulp.src([config.es6runtime, config.dist + '/main.js'])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify(config.uglifySettings))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
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
