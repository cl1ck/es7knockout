'use strict';

var gulp = require('gulp');
var handleErrors    = require('../handleErrors');
var config          = require('../config').javascript;
var usenotifier     = require('../config').usenotifier;
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var cache           = require('gulp-cached');
var notify          = require('gulp-notify');
var gulpif          = require('gulp-if');

gulp.task('jshint', function() {
    gulp.src([config.watch, config.gulp])
    .pipe(cache('jshint'))
    .pipe(jshint())
    .pipe(
        gulpif(usenotifier,
            notify(function(file) {
                if (file.jshint.success) {
                    // Don't show something if success
                    return false;
                }

                var errors = file.jshint.results.map(function(data) {
                    if (data.error) {
                        return '(' + data.error.line + ':' + data.error.character + ') ' +
                            data.error.reason;
                    }
                }).join('\n');
                return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
            }),
            jshint.reporter(stylish)
        )
    )
    .on('error', handleErrors);
});
