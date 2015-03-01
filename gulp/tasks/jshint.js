'use strict';

var gulp            = require('gulp');
var config          = require('../config').javascript;
var useNotifier     = require('../config').useNotifier;
var jshint          = require('gulp-jshint');
var stylish         = require('jshint-stylish');
var jscs            = require('gulp-jscs');
var combine         = require('gulp-jscs-stylish').combineWithHintResults;
var notify          = require('gulp-notify');
var gulpif          = require('gulp-if');

gulp.task('jshint', function() {
    return gulp.src(config.src)
    .pipe(jshint())
    .pipe(jscs({
        configPath: './.jscsrc'
    }))
    .on('error', function() {})
    .pipe(combine())
    .pipe(
        gulpif(useNotifier,
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
    .pipe(jshint.reporter('fail'));
});
