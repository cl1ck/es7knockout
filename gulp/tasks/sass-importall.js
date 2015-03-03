var gulp    = require('gulp');
var fs      = require('fs');
var path    = require('path');
var config  = require('../config').sass;
var dir     = require('node-dir');

gulp.task('sass-importall', function (cb) {
    dir.paths(config.srcPath, function(err, paths) {
        if (err) throw err;

        paths.dirs.forEach(function (directory) {
            var fileName = directory + '/_all.scss';
            fs.writeFileSync(fileName, '// This file is generated dynamically, do not change manually!\n\n');

            // search for all scss partials in current dir
            var partials = fs.readdirSync(directory).filter(function (file) {
                return (
                    file !== '_all.scss' &&
                    path.basename(file).substring(0, 1) === '_' &&
                    (path.extname(file) === '.scss' || path.extname(file) === '.sass')
                );
            });

            // import each partial into _all.scss
            partials.forEach(function (partial) {
                var importName = partial.slice(1,-5);
                fs.appendFileSync(fileName, '@import \'' + importName + '\';\n');
            });
        });
        cb();
    });

});
