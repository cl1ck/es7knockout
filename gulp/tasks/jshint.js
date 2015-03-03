/**
 * Will run JSHint on all js source files.
 * This task will fail on any linter error or coding style violation!
 */
'use strict';

var gulp            = require('gulp');
var config          = require('../config');
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var jscs            = require('gulp-jscs');
var combine         = require('gulp-jscs-stylish').combineWithHintResults;
var notify          = require('gulp-notify');
var gulpif          = require('gulp-if');

gulp.task('jshint', function() {
    return gulp.src(config.srcDir + config.javascript.subDir + config.javascript.watchFiles)
    .pipe(jshint())
    .pipe(jscs({
        configPath: config.baseDir + config.javascript.jscsConfig
    }))
    // jscs will throw an error on linter errors
    // ignore them as they will be reported together with the jshint errors
    .on('error', function() {})
    .pipe(combine())
    .pipe(
        gulpif(config.useNotifier,
            notify(function(file) {
                if (file.jshint.success) {
                    // Don't notify if success
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
            // fall back to stylish
            jshint.reporter(stylish)
        )
    )
    .pipe(jshint.reporter('fail'));
});
