var gulp            = require('gulp'),
    config          = require('../config').coffeelint,
    coffeelint      = require('gulp-coffeelint'),
    handleErrors    = require('../util/handleErrors'),
    plumber         = require('gulp-plumber'),
    path            = require('path'),
    map             = require('map-stream'),
    events          = require('events'),
    emmitter        = new events.EventEmitter();

// Custom linting reporter
var coffeelintErrorReporter = map(function (file, cb) {
    if (!file.coffeelint.success) {
        file.coffeelint.results.forEach(function (err) {
            if (err) {
                // Error message
                var msg = [
                    path.basename(file.path),
                    'Line: ' + err.lineNumber,
                    'Reason: ' + err.message
                ];

                // Emit this error event
                emmitter.emit('error', new Error(msg.join('\n')));
            }
        });
    }
    cb(null, file);
});

gulp.task('coffeelint', function() {
    return gulp.src(config.src)
        .pipe(coffeelint('./.coffeelint.json'))
        .on('error', handleErrors)
        .pipe(coffeelint.reporter())
        .pipe(coffeelintErrorReporter)
        .on('error', handleErrors);
});
