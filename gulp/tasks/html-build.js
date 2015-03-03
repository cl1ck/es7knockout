/**
 * Compiles all ejs source files to the build directory.
 * This task is setting the "production" variable for all ejs template to "true".
 */
'use strict';

var gulp    = require('gulp');
var config  = require('../config');
var ejs     = require('gulp-ejs');

gulp.task('html-build', function() {
    return gulp.src(config.srcDir + config.html.subDir + config.html.files)
        .pipe(ejs({
            production: true
        }))
        .pipe(gulp.dest(config.buildTargetDir + config.html.subDir));
});
