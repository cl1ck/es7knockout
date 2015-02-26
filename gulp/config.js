'use strict';

var basedir     = __dirname.substring(0, __dirname.lastIndexOf('/'));
var src         = basedir + '/src';
var builddir    = basedir + '/build';
var distdir     = basedir + '/dist';
var docdir      = builddir + '/docs';
var jspmdir     = basedir + '/jspm_packages';

module.exports = {
    // use gulp-notify to display system notifications (does not work on some DE-less systems)
    useNotifier: false,
    logErrors: false,
    openBrowser: false,
    builddir: builddir,
    distdir: distdir,
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
        dest: builddir + '/css',
        dist: distdir + '/css',
        distSrc: builddir + '/css/*.css',
        distDest: distdir + '/css',
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
        src: src + '/images/**/*.*',
        dest: builddir + '/images',
        distSrc: builddir + '/images/**/*.*',
        distDest: distdir + '/images/'
    },
    jade: {
        src: src + '/jade/**',
        dest: builddir,
        dist: distdir
    },
    html: {
        src: src + '/html/*.html',
        dest: builddir,
        distSrc: builddir + '/*.html',
        distDest: distdir
    },
    javascript: {
        src: src + '/js/**/*.js',
        dest: builddir + '/js',
        distSrc: builddir + '/js/*.js',
        distDest: distdir + '/js',
        bundleMain: 'src/js/main',
        bundleFile: builddir + '/js/app.js',
        es6runtime: jspmdir + '/babel-polyfill.js',
        uglifyOptions: {

        }
    },
    styleguide: {
        dest: docdir,
        title: 'Build It',
        post: 3500
    },
    tests: {
        src: src + '/test/**/*.spec.js',
        karmaConfig: __dirname + '/../karma.conf.js'
    },
};
