'use strict';

var src         = './src';
var builddir    = './build';
//var distdir     = './dist';
var docdir      = './docs';
var gulpdir     = './gulp';

module.exports = {
    // use gulp-notify to display system notifications (does not work on some DE-less systems)
    useNotifier: false,
    logErrors: false,
    browsersync: {
        server: {
            // server src too (for sourcemaps)
            baseDir: [builddir, src]
        },
        files: [
            builddir + '/**/*.*',
            '!' + builddir + '/**.map'
        ],
        port: 3000,
        browser: [],
        tunnel: false
    },
    sass: {
        src: src + '/sass/*.{sass,scss}',
        dest: builddir + '/css/',
        watch: src + '/sass/**/*.*',
        settings: {
            sourceComments: 'map',
            imagePath: '/images'
        },
        autoprefixer: {
            browsers: ['last 2 version']
        }
    },
    images: {
        src: src + '/images/**',
        dest: builddir + '/images'
    },
    jade: {
        src: src + '/jade/**',
        dest: builddir
    },
    html: {
        src: src + '/html/*.html',
        dest: builddir
    },
    javascript: {
        src: src + '/js/main',
        watch: src + '/js/**/*.js',
        gulp: gulpdir + '/**/*.js',
        dest: builddir + '/js/app.js',
        fixmyjs: false
    },
    styleguide: {
        dest: docdir,
        title: 'Build It'
    }
};
