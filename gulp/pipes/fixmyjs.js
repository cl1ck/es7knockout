var lazypipe    = require('lazypipe'),
    fixmyjs     = require('gulp-fixmyjs');

module.exports = lazypipe()
                .pipe(fixmyjs);
