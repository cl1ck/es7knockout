var gulp = require('gulp');
var config = require('../config').jade

gulp.task('jade', function() {
    return gulp.src(config.src)
        .pipe(jade())
        .pipe(gulp.dest(config.dest));
});
