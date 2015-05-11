/**
 * Lint sass with scss-lint.
 * This task will fail on linter errors if building for production!
 */
'use strict';

var gulp            = require('gulp');
var config          = require('../config');
var scsslint        = require('gulp-scss-lint');
var path            = require('path');
var gulpif          = require('gulp-if');
var notify          = require('gulp-notify');
var handleErrors    = require('../handleErrors');

// Custom linting reporter
var errorReporter = function(file) {
    if (!file.scsslint.success) {
        file.scsslint.issues.forEach(function(err) {
            if (err) {
                notify().write(
                    err.severity + ' in ' + path.basename(file.path) + ':' +
                        err.line + ' @ char ' + err.column + '\n' + err.reason
                );
            }
        });
    }
};

var failReporter = function(file) {
    if (!file.scsslint.success) {
        file.scsslint.issues.forEach(function(err) {
            if (err) {
                console.log(
                    'scsslint error: ' +
                    err.severity + ' in ' + path.basename(file.path) + ':' +
                    err.line + ' @ char ' + err.column + '\n' + err.reason
                );
            }
        });
    }
};

gulp.task('scsslint', ['sass-importall'], function() {
    return gulp.src(config.srcDir + config.sass.subdir + config.sass.watchFiles)
    .pipe(gulpif(config.useNotifier,
        scsslint({
            config: config.baseDir + config.sass.scssLintConfig,
            customReport: errorReporter
        }),
        scsslint({
            config: config.baseDir + config.sass.scssLintConfig,
            customReport: failReporter
        })
    ))
    .on('error', handleErrors);
});
