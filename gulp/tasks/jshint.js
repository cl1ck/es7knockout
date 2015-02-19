var gulp            = require('gulp'),
    handleErrors    = require('../handleErrors'),
    config          = require('../config').javascript,
    usenotifier     = require('../config').usenotifier,
    jshint          = require('gulp-jshint'),
    stylish         = require('jshint-stylish'),
    cache           = require('gulp-cached'),
    notify          = require('gulp-notify'),
    gulpif          = require('gulp-if');

gulp.task('jshint', function() {
    gulp.src(config.watch)
    .pipe(cache('jshint'))
    .pipe(jshint())
    .pipe(
        gulpif(usenotifier,
            notify(function(file) {
                if (file.jshint.success) {
                    // Don't show something if success
                    return false;
                }

                var errors = file.jshint.results.map(function(data) {
                    if (data.error) {
                        return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
                    }
                }).join('\n');
                return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
            }),
            jshint.reporter(stylish)
        )
    )
    .on('error', handleErrors);
});
