'use strict';

var gulp = require('gulp');
var handleErrors = require('../handleErrors');
var config = require('../config').javascript;
var usenotifier = require('../config').usenotifier;
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var notify = require('gulp-notify');
var gulpif = require('gulp-if');

gulp.task('jscs', function() {
    return gulp.src(config.src)
    .pipe(jscs({
        configPath: './.jscsrc'
    }))
    .on('error', function() {})
    .pipe(
        gulpif(usenotifier,
            notify(function(file) {
                if (file.jscs.success) {
                    // Don't show something if success
                    return false;
                }

                var errors = file.jscs.errors.map(function(error) {
                    if (error) {
                        return '(' + error.line + ':' + error.column + ') ' +
                            error.message;
                    }
                }).join('\n');
                return file.relative + ' (' + file.jscs.errorCount + ' errors)\n' + errors;
            }),
            stylish()
        )
    )
    .on('error', handleErrors);
});
