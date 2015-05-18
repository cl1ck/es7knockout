/**
 * Bundle & minify your javascript main module for produciton.
 * This task will fail on any compiler error!
 */
'use strict';

var gulp            = require('gulp');
var config          = require('../config');
var uglify          = require('gulp-uglify');
var shell           = require('gulp-shell');
var runSequence     = require('run-sequence');
var del             = require('del');
var concat          = require('gulp-concat');
var sourcemaps      = require('gulp-sourcemaps');
var handleErrors    = require('../handleErrors');

// creates self-executing bundle as main.js
gulp.task('jspm:compile',  shell.task([
    'jspm bundle-sfx ' +
    config.javascript.bundleMain + ' ' +
    config.buildTargetDir + config.javascript.subDir +
    'main.js'
]));

// bundle and minify es6 runtime and main.js as app.js
gulp.task('jspm:uglify', function() {
    return gulp.src([
            config.javascript.es6runtime,
            config.buildTargetDir + config.javascript.subDir + 'main.js'
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify(config.javascript.uglifySettings))
        .on('error', handleErrors)
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildTargetDir + config.javascript.subDir));
});

// delete main.js and main.js.map
gulp.task('jspm:cleanup', function(cb) {
    del(config.buildTargetDir + config.javascript.subDir + 'main.*', cb);
});

// bundle, uglify and cleanup your javascript main module
gulp.task('javascript-build', function(cb) {
    runSequence(
        'jspm:compile',
        'jspm:uglify',
        'jspm:cleanup',
        cb
    );
});
