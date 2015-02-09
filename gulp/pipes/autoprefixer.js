var lazypipe        = require('lazypipe'),
    autoprefixer    = require('gulp-autoprefixer'),
    config          = require('../config').autoprefixer;

module.exports = lazypipe()
                .pipe(autoprefixer, config);
