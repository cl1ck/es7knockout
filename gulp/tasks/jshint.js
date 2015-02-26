'use strict';

var gulp            = require('gulp');
var handleErrors    = require('../handleErrors');
var config          = require('../config').javascript;
var usenotifier     = require('../config').usenotifier;
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var notify          = require('gulp-notify');
var gulpif          = require('gulp-if');

gulp.task('jshint', function() {
    return gulp.src(config.src)
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
