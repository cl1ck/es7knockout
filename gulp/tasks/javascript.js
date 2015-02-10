var gulp            = require('gulp'),
    config          = require('../config').javascript,
    jshint          = require('../pipes/jshint'),
    jspmbundler     = require('../pipes/jspmbundler'),
    reload          = require('../pipes/reload'),
    handleErrors    = require('../handleErrors');

gulp.task('javascript', function() {
    return gulp.src(config.src)
        .pipe(jshint())
        .on('error', handleErrors)
        .pipe(jspmbundler())
        .pipe(gulp.dest(config.dest))
        .pipe(reload());
});
