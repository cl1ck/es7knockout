var gulp        = require('gulp'),
    config      = require('../config').javascript,
    shell       = require('gulp-shell');

gulp.task('javascript', ['jshint'], function() {
    gulp.src(config.src, {read: false})
    .pipe(shell(['jspm bundle-sfx ' + config.appsrc + ' ' + config.dest + '  &>/dev/null']))
    .on('error', function() {
        // ignore error (usually already thrown by jshint)
        this.emit('end');
    });
});
