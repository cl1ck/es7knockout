var gulp    = require('gulp'),
    config  = require('../config');

gulp.task('watch', ['build', 'browsersync'], function(cb) {
    gulp.watch(config.styleguide.watch, ['styleguide']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.jade.src, ['jade']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.sass.watch, ['sass']);
    gulp.watch(config.javascript.watch, ['javascript']);
});
