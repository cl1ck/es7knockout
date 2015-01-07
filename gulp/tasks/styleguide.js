var gulp         = require('gulp');
var sass         = require('gulp-sass');
var handleErrors = require('../util/handleErrors');
var sassconfig   = require('../config').sass;
var styleconfig  = require('../config').styleguide;
var gulpconcat   = require('gulp-concat');
var styledocco   = require('gulp-styledocco');
var del          = require('del');

gulp.task('styleguide-clean', function() {
    return del(styleconfig.dest + '/**/*.*');
});

gulp.task('styleguide-copy-includes', function() {
    return gulp.src(styleconfig.src + styleconfig.srcfile)
        .pipe(gulp.dest(styleconfig.dest));
});

gulp.task('styleguide-create', function () {
    gulp.src(sassconfig.src)
    .pipe(styledocco({
        out: styleconfig.dest,
        include: [ styleconfig.dest  + styleconfig.srcfile ]
    }));
});

gulp.task('styleguide', ['styleguide-clean', 'styleguide-copy-includes', 'styleguide-create']);
