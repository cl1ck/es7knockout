var gulp            = require('gulp'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').sass,
    gutil           = require('gulp-util'),
    scsslint        = require('gulp-scss-lint'),
    cache           = require('gulp-cached'),
    path            = require('path'),
    map             = require('map-stream'),
    events          = require('events'),
    emmitter        = new events.EventEmitter(),
    errorReporter;

// Custom linting reporter
errorReporter = map(function(file, cb) {
    if (!file.scsslint.success) {
        file.scsslint.issues.forEach(function(err) {
            if (err) {
                // Error message
                var msg = [
                    path.basename(file.path),
                    'Line: ' + err.line,
                    'Column: ' + err.column,
                    'Severity: ' + err.severity,
                    'Reason: ' + err.reason
                ];

                // Emit this error event
                emmitter.emit('error', new Error(msg.join('\n')));
            }
        });
    }
    cb(null, file);
});

gulp.task('scsslint', function() {
    gulp.src(config.src)
    .pipe(cache('scsslint'))
    .pipe(scsslint({
        config: './.scsslint.yml'
    }))
    .pipe(errorReporter)
    .on('error', handleErrors);
});
