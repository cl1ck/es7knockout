'use strict';

var gulp            = require('gulp');
var config          = require('../config').sass;
var useNotifier     = require('../config').useNotifier;
var scsslint        = require('gulp-scss-lint');
var path            = require('path');
var gulpif          = require('gulp-if');
var notify          = require('gulp-notify');
var gutil           = require('gulp-util');
// Custom linting reporter
var errorReporter = function(file, stream) {
    if (!file.scsslint.success) {
        file.scsslint.issues.forEach(function(err) {
            if (err) {
                notify().write(
                    err.severity + ' in ' + path.basename(file.path) + ':' +
                        err.line + ' @ char ' + err.column + '\n' + err.reason
                );
            }
        });
        stream.emit('error', new gutil.PluginError("scss-lint", "scss lint failed"));
    }
};

var failReporter = function(file, stream) {
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
        stream.emit('error', new gutil.PluginError("scss-lint", "scss lint failed"));
    }
};

gulp.task('scsslint', ['sass-importall'], function() {
    gulp.src(config.allSrc)
    .pipe(gulpif(useNotifier,
        scsslint({config: './.scss-lint.yml', customReport: errorReporter}),
        scsslint({config: './.scss-lint.yml', customReport: failReporter})
    ))
});
