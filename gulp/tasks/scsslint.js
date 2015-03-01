'use strict';

var gulp            = require('gulp');
var config          = require('../config').sass;
var useNotifier     = require('../config').useNotifier;
var scsslint        = require('gulp-scss-lint');
var path            = require('path');
var gulpif          = require('gulp-if');
var notify          = require('gulp-notify');

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

gulp.task('scsslint', function() {
    return gulp.src(config.watch)
    .pipe(gulpif(useNotifier,
        scsslint({config: './.scss-lint.yml', customReport: errorReporter}),
        scsslint({config: './.scss-lint.yml'})
    ))
    .pipe(scsslint.failReporter())
});
