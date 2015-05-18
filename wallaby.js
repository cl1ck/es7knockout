module.exports = function () {
    var babelPreprocessor = file => require('babel').transform(file.content, {sourceMap: true});

    return {
        testFramework: 'mocha@2.2.4',

        files: [
            {pattern: 'node_modules/chai/chai.js', instrument: false},
            {pattern: 'node_modules/karma-babel-preprocessor/node_modules/babel-core/browser-polyfill.js', instrument: false},
            {pattern: 'jspm_packages/system.js', instrument: false},
            {pattern: 'jspm_config.js', instrument: false},
            {pattern: 'public/js/**/*.js', load: false},
            {pattern: 'public/js/**/*.spec.js', ignore: true}
        ],

        tests: [
            {pattern: 'public/js/**/*.spec.js', load: false}
        ],

        preprocessors: {
            'public/js/**/*.js': babelPreprocessor
        },

        middleware: (app, express) => {
            app.use('/jspm_packages', express.static(require('path').join(__dirname, 'jspm_packages')));
        },

        bootstrap: function (wallaby) {
            wallaby.delayStart();

            var mocha = wallaby.testFramework;
            mocha.ui('bdd');

            var promises = [];
            promises.push(System.import('chai'));
            for (var i = 0, len = wallaby.tests.length; i < len; i++) {
                promises.push(System.import(wallaby.tests[i].replace(/\.js$/, '')));
            }

            Promise.all(promises).then(function () {
                window.assert = chai.assert;
                window.expect = chai.expect;
                wallaby.start();
            });
        }
    };
};
