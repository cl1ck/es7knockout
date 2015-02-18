var gulp            = require('gulp'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').javascript,
    usenotifier     = require('../config').usenotifier,
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    cache           = require('gulp-cached'),
    map             = require('map-stream'),
    events          = require('events'),
    notify          = require('gulp-notify'),
    emmitter        = new events.EventEmitter(),
    path            = require('path'),

jsHintErrorReporter = map(function(file, cb) {
  if (!file.jshint.success && usenotifier) {
    file.jshint.results.forEach(function(err) {
      if (err) {
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

gulp.task('jshint', function() {
    gulp.src(config.watch)
    .pipe(cache('jshint'))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jsHintErrorReporter)
    .on('error', handleErrors);
});
