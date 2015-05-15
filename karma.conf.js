/*global module*/
module.exports = function(config) {
    config.set({
        basePath: '',

        frameworks: ['jspm', 'mocha', 'sinon-chai', 'phantomjs-shim'],

        // do not add files here, they will be served by karma-jspm
        files: [],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/js/**/*.js': ['babel', 'coverage']
        },

        babelPreprocessor: {
            options: {
                modules: 'system'
            }
        },

        jspm: {
            loadFiles: ['src/test/**/*.spec.js'],
            serveFiles: ['src/test/**/*.spec.js', 'src/js/**/*.js'],
            config: 'src/jspm_config.js',
            packages: 'src/jspm_packages/'
        },

        proxies: {
            '/base/jspm_packages/': '/base/src/jspm_packages/'
        },

        plugins: [
            'karma-junit-reporter',
            'karma-coverage',
            'karma-mocha',
            'karma-sinon-chai',
            'karma-coverage',
            'karma-jspm',
            'karma-phantomjs-launcher',
            'karma-phantomjs-shim',
            'karma-mocha-reporter',
            'karma-babel-preprocessor'
        ],

        // test results reporter to use
        reporters: [
            'mocha',
            'junit',
            'coverage'
        ],

        junitReporter: {
            outputFile: 'reports/test-units.xml',
            suite: ''
        },

         coverageReporter: {
            dir : 'reports/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' }
            ]
         },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // start these browsers
        browsers: ['PhantomJS'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
