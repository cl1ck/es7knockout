/**
 * Creates _all.scss files in each subdirectory of the sass source directory.
 * _all.scss will contain @import statements for each .scss or .sass file in the same directory.
 * This is used as a workaround for the missing import all functionality in sass.
 */
'use strict';

var gulp    = require('gulp');
var fs      = require('fs');
var path    = require('path');
var config  = require('../config');
var dir     = require('node-dir');

gulp.task('sass-importall', function (cb) {
    dir.paths(config.srcDir + config.sass.subDir, function(err, paths) {
        if (err) {
            throw err;
        }

        paths.dirs.forEach(function (directory) {
            var fileName = directory + '/_all.scss';
            fs.writeFileSync(fileName, '// This file was generated automatically\n\n');

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
