buildit
============

Starter project for my personal frontend development projects.
Based on [gulp-starter](https://github.com/greypants/gulp-starter/) by [greypants](https://github.com/greypants/).

Includes the following tools, tasks, and workflows:

- [JSPM](https://jspm.io) (modern package manager for the frontend)
- [ES6](http://kangax.github.io/compat-table/es6/) Harmony support using 6to5 transpiler
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [SC5 Styleguide](http://styleguide.sc5.io/) for generating nice styleguides using KSS notation
- Testing with Karma, Mocha, Sinon & Chai
- Linting for all source files
- Image optimization
- Error notifications in Notification Center

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install jspm, gulp and the karma-cli globally

jspm, gulp and karma-cli must be installed globally in order to use the command line tools. *You may need to use `sudo`*

```
npm install gulp jspm karma-cli -g
```

### Install npm dependencies

```
npm install
```

This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.

### Initialize JSPM

```
jspm init
```

### Install required ruby gems

```
gem install bundler
```

You'll need to install [bundler](http://bundler.io) first. This will enable you to install the required ruby gems. *You may need to use `sudo`*

```
bundle install
```

This will install all gems listed in `Gemfile`. *You may need to use `sudo`*

### Run gulp and be amazed.

```
gulp
```

This will run the default build task which compiles all source files and start BrowserSync on port 3000.

Open [http://localhost:3000](http://localhost:3000) to open your index.html.
The generated styleguide will be located at [http://localhost:3500](http://localhost:3500).

This also will start watching your source folders and automatically compile and serve any changes you make.

### Production

```
gulp dist
```

This will bundle your application for production by combining, minifying and optimizing all of your source files.

### Configuration

All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.

### Roadmap
- [] switch from jshint to eslint
- [] add jsdoc or some other kind of js source docs
- [] add knockout support with module structure
