var lazypipe    = require('lazypipe'),
    config      = require('../config').javascript,
    shell       = require('gulp-shell');

module.exports = lazypipe()
                .pipe(function() {
                    return shell([
                        'jspm bundle-sfx ' + config.src + ' ' + config.dest
                    ])}
                );
