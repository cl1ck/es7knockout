var lazypipe        = require('lazypipe'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').javascript,
    gutil           = require('gulp-util'),
    plumber         = require('gulp-plumber'),
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    path            = require('path'),
    map             = require('map-stream'),
    events          = require('events'),
    emmitter        = new events.EventEmitter(),
    errorReporter;

// Custom jshint error reporter
errorReporter = map(function(file, cb) {
    if (!file.jshint.success) {
        file.jshint.results.forEach(function(err) {
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

module.exports = lazypipe()
    .pipe(plumber)
    .pipe(jshint)
    .pipe(function() {
        return jshint.reporter(stylish);
    })
    .pipe(function() {
        return errorReporter;
    })
