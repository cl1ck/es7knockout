'use strict';

var src         = './src';
var builddir    = './build';
//var distdir     = './dist';
var docdir      = './docs';
var gulpdir     = './gulp';
var jspmdir     = './jspm_packages';

module.exports = {
    // use gulp-notify to display system notifications (does not work on some DE-less systems)
    useNotifier: false,
    logErrors: false,
    browsersync: {
        server: {
            // serve src too (for sourcemaps)
            baseDir: builddir,
            routes: {
                '/src': src
            }
        },
        files: [
            builddir + '/**/*.*'
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
        watch: src + '/js/**/*.js',
        gulp: gulpdir + '/**/*.js',
        dest: builddir + '/js',
        bundleMain: src + '/js/main',
        bundleFile: builddir + '/js/app.js',
        es6runtime: jspmdir + '/babel-polyfill.js'
    },
    styleguide: {
        dest: docdir,
        title: 'Build It'
    }
};
