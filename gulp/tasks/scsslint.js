var gulp            = require('gulp'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').sass,
    usenotifier     = require('../config').usenotifier,
    gutil           = require('gulp-util'),
    scsslint        = require('gulp-scss-lint'),
    cache           = require('gulp-cached'),
    path            = require('path'),
    map             = require('map-stream'),
    events          = require('events'),
    gulpif          = require('gulp-if'),
    emmitter        = new events.EventEmitter(),
    notify          = require('gulp-notify'),
    errorReporter;

// Custom linting reporter
errorReporter = function(file, stream) {
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
    gulp.src(config.src)
    .pipe(cache('scsslint'))
    .pipe(gulpif(usenotifier,
        scsslint({config: './.scsslint.yml', customReport: errorReporter}),
        scsslint({config: './.scsslint.yml'})
    ))
    .on('error', handleErrors);
});
