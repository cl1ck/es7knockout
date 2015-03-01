var gulp    = require('gulp');
var config  = require('../config');

gulp.task('watch', ['build', 'browsersync'], function() {
    gulp.watch(config.html.src, ['html-build']);
    gulp.watch(config.javascript.src, ['jshint', 'jscs']);
    gulp.watch(config.sass.watch, ['sass-build', 'styleguide']);
});
