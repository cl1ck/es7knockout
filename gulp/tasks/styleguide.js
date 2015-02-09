var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    handleErrors = require('../handleErrors'),
    sassconfig   = require('../config').sass,
    styleconfig  = require('../config').styleguide,
    styledocco   = require('gulp-styledocco'),
    del          = require('del');

gulp.task('styleguide-clean', function() {
    return del(styleconfig.dest + '/**/*.*');
});

gulp.task('styleguide-copy-includes', function() {
    return gulp.src(styleconfig.src + styleconfig.srcfile)
        .pipe(gulp.dest(styleconfig.dest));
});

gulp.task('styleguide-create', function() {
    gulp.src(sassconfig.src)
    .pipe(styledocco({
        out: styleconfig.dest,
        include: [styleconfig.dest  + styleconfig.srcfile]
    }));
});

gulp.task('styleguide', ['styleguide-clean', 'styleguide-copy-includes', 'styleguide-create']);
