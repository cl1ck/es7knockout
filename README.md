# buildit
[![Build Status](http://jenkins.cl1ck0ne.net/buildStatus/icon?job=buildit)](http://jenkins.cl1ck0ne.net/job/buildit/)

Starter project for my personal frontend development projects.

- [Vagrant](https://www.vagrantup.com/) and [Ansible](http://www.ansible.com) for provisioning a development VM
- [JSPM](https://jspm.io) as frontend [ES6](http://kangax.github.io/compat-table/es6/) package manager
- [SASS](http://sass-lang.com/) (using libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap) and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [BrowserSync](http://browsersync.io) for live reloading
- [SC5 Styleguide](http://styleguide.sc5.io/) for generating awesome styleguides using KSS notation
- Testing with Karma, Mocha, Sinon & Chai
- Linting for all source files
- Image optimization
- Error notifications in Notification Center

*NOTE:* This project does not contain any example code! If you want a more complete example of how to use `buildit`
check out [buildit-example](https://github.com/cl1ck/buildit-example).

## Start new project

To start a new project `app` clone `buildit`:

```
git clone -o buildit https://github.com/cl1ck/buildit.git app
cd app
```

Then add your remote:

```
git remote add origin git@github.com:username/app.git
git push origin master
git branch --set-upstream-to origin/master
```

## Installation

`buildit` uses Ansible + Vagrant to provision a development VM.

### 1. Install Ansible

On OS X make sure XCode is installed. Then do:

```
easy_install pip
pip install ansible
```

### 2. Install Vagrant

Download and install Vagrant from the [official download page](https://www.vagrantup.com/downloads.html).

### 3. Provision the development box

```
vagrant up
```

## Working with `buildit`

To use the following tasks you need to SSH into the Vagrant VM:

```
vagrant ssh
cd /vagrant
```

### Development task

```
gulp
```

This will run the default gulp task which compiles all source files and starts BrowserSync on port 3000.

Open [http://localhost:3000](http://localhost:3000) to open your index.html.
The generated styleguide will be located at [http://localhost:3500](http://localhost:3500).

This will also start watching your source folders and automatically compile and serve any changes you make.

### Test task

```
gulp test
```

This will lint and check codestyle for all sourcefiles and run your tests.
Tests are in the same folder as the sourcefiles and have to end with `.spec.js`.

### Production

```
gulp build
```

Bundle your application for production by combining, minifying and optimizing all of your source files.

## Configuration

All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`.
Adapt the paths and settings to the structure and needs of your project.

## Update

To update `buildit` merge all changes into your fork, then re-provision vagrant:

```
git pull buildit master
vagrant provision
```

## Common problems

```
Error: `libsass` bindings not found in /vagrant/node_modules/gulp-sass/node_modules/node-sass/vendor/linux-x64-11/binding.node. Try reinstalling `node-sass`?
```

This is a common known error of node-sass. Try `npm rebuild node-sass` to fix.
