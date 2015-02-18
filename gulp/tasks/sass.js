var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    prefixerconfig  = require('../config').autoprefixer;
    handleErrors    = require('../handleErrors'),
    config          = require('../config').sass;

gulp.task('sass', ['scsslint'], function() {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', function() {
            // ignore error (usually already thrown by scsslint)
            this.emit('end');
        })
        .pipe(sourcemaps.write({includeContent: false}))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(autoprefixer(prefixerconfig))
        .on('error', handleErrors)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest))
        .on('error', handleErrors);
});
