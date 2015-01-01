var gulp            = require('gulp'),
    handleErrors    = require('../util/handleErrors'),
    config          = require('../config').jslint,
    gutil           = require('gulp-util'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    notify          = require('gulp-notify'),
    plumber         = require('gulp-plumber'),
    fixmyjs         = require('gulp-fixmyjs'),
    path            = require('path'),
    map             = require('map-stream'),
    events          = require('events'),
    emmitter        = new events.EventEmitter();

// Custom linting reporter
var jshintErrorReporter = map(function (file, cb) {
    if (!file.jshint.success) {
        file.jshint.results.forEach(function (err) {
            if (err) {
                // Error message
                var msg = [
                    path.basename(file.path),
                    'Line: ' + err.error.line,
                    'Reason: ' + err.error.reason
                ];

                // Emit this error event
                emmitter.emit('error', new Error(msg.join('\n')));
            }
        });
    }
    cb(null, file);
});

gulp.task('jslint', function() {
    if (config.fixmyjs) {
        return gulp.src(config.src)
            .pipe(plumber())
            .pipe(fixmyjs())
            .pipe(gulp.dest(config.dest));
    } else {
        return gulp.src(config.src)
            .pipe(plumber())
            .pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshintErrorReporter)
            .on('error', notify.onError(function(error) {
                return error.message;
            }));
    }
});
