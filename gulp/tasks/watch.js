/**
 * Watches ejs and sass directory and compiles them on change to the temp directory for development.
 */
var gulp    = require('gulp');
var config  = require('../config');

gulp.task('watch', ['precompile-dev', 'browsersync'], function() {
    // on ejs/html change:
    gulp.watch(
        config.srcDir + config.html.subDir + config.html.watchFiles,
        ['html-dev']
    );

    // on sass change:
    gulp.watch(
        config.srcDir + config.sass.subDir + config.sass.watchFiles,
        ['sass-dev', 'styleguide']
    );
});
