var gulp    = require('gulp'),
    config  = require('../config');

gulp.task('watch', ['build'], function() {
    gulp.watch(config.sass.watch, ['sass', 'styleguide']);
    gulp.watch(config.images.src, ['images']);
    gulp.watch(config.jade.src, ['jade']);
    gulp.watch(config.html.src, ['html']);
    gulp.watch(config.javascript.watch, ['javascript']);
});
