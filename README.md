# buildit
============
[![Build Status](http://jenkins.cl1ck0ne.net/buildStatus/icon?job=buildit)](http://jenkins.cl1ck0ne.net/job/buildit/)

Starter project for my personal frontend development projects.
Based on [gulp-starter](https://github.com/greypants/gulp-starter/) by [greypants](https://github.com/greypants/).

Includes the following tools, tasks, and workflows:

- [JSPM](https://jspm.io) (modern package manager for the frontend)
- [ES6](http://kangax.github.io/compat-table/es6/) Harmony support using the babel transpiler
- [SASS](http://sass-lang.com/) (using libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap) and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [BrowserSync](http://browsersync.io) for live reloading
- [SC5 Styleguide](http://styleguide.sc5.io/) for generating awesome styleguides using KSS notation
- Testing with Karma, Mocha, Sinon & Chai
- Linting and codestyle check for all source files
- Image optimization
- Error notifications in Notification Center

*NOTE:* This project does not contain any example code! If you want a more complete example of how to use `buildit`
check out [buildit-example](https://github.com/cl1ck/buildit-example).


## Start new project

To start a new project `app` simply fork `buildit`:

```
git clone -o buildit https://github.com/cl1ck/buildit.git app
cd app
```

Then add the remote origin of your new project:

```
git remote add origin git@github.com:username/app.git
git push origin master
git branch --set-upstream-to origin/master
```

## Installation: Quick guide (experienced user)

Make sure the sass and scss-lint ruby gems are installed. Then do:

```
npm install
npm install gulp jspm karma-cli -g
jspm install
```

## Installation: Detailed (new to nodejs / gulp)

`buildit` requires several dependencies. In order to install them, follow the instructions below. *You may need to use `sudo` for some commands*

### 1. Install nodejs

If you've never used Node or npm before, you'll need to install nodejs.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### 2. Install jspm, gulp and the karma-cli globally

jspm, gulp and karma-cli should be installed globally in order to use the command line tools.

```
npm install gulp jspm karma-cli -g
```

### 3. Install npm & jspm dependencies

```
npm install
jspm install
```

Install all npm and jspm dependencies.

### 4. Install sass and scss-lint

Make sure ruby is installed. Then use the following commands to install the gems:

```
gem install bundler
bundle install
```

## Development

```
gulp
```

This will run the default gulp task which compiles all source files and starts BrowserSync on port 3000.

Open [http://localhost:3000](http://localhost:3000) to open your index.html.
The generated styleguide will be located at [http://localhost:3500](http://localhost:3500).

This will also start watching your source folders and automatically compile and serve any changes you make.

## Testing

```
gulp test
```

This will lint and check codestyle for all sourcefiles and run your tests.
Tests reside in the `src/test` directory and end with `spec.js`.

## Production

```
gulp build
```

Bundle your application for production by combining, minifying and optimizing all of your source files.

## Configuration

All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.

## Update

To update `buildit` merge all changes into your fork:

```
git pull buildit master
npm install
jspm install
```

## Roadmap
- [ ] add jsdoc or some other kind of js source docs
- [ ] add code coverage as soon as the [problems with karma-jspm](https://github.com/Workiva/karma-jspm/issues/22) are solved
