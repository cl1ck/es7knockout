var src = './src',
    dest = './build';

module.exports = {
    browserSync: {
        server: {
            baseDir: [dest, src]
        },
        files: [
            dest + '/**/*.*',
            '!' + dest + '/**.map'
        ]
    },
    sass: {
        src: src + '/sass/*.{sass,scss}',
        dest: dest + '/css/',
        watch: src + '/sass/**/*.*',
        settings: {
            sourceComments: 'map',
            imagePath: '/images'
        },
        scsslint: true
    },
    autoprefixer: {
        browsers: ['last 2 version']
    },
    images: {
        src: src + '/images/**',
        dest: dest + '/images'
    },
    jade: {
        src: src + '/jade/**',
        dest: dest
    },
    html: {
        src: src + '/html/*.html',
        dest: dest
    },
    javascript: {
        src: src + '/js/main',
        watch: src + '/js/**/*.js',
        dest: dest + '/js/app.js',
        fixmyjs: false
    },
    styleguide: {
        src: src + '/styleguide/',
        srcfile: 'styleguide.css',
        dest: dest + '/docs/'
    }
};
