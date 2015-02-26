'use strict';

var gulp    = require('gulp');
var config  = require('../config').images;

gulp.task('images-dist', function() {
    return gulp.src(config.distSrc)
        .pipe(gulp.dest(config.distDest));
});
