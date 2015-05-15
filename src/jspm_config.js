System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.2.15",
    "babel-runtime": "npm:babel-runtime@5.2.15",
    "core-js": "npm:core-js@0.9.6",
    "knockout": "github:knockout/knockout@3.3.0",
    "systemjs/plugin-text": "github:systemjs/plugin-text@0.0.2",
<<<<<<< HEAD:src/jspm_config.js
    "text": "github:systemjs/plugin-text@0.0.2",
=======
>>>>>>> 9c46d0ecf655a9394e99240bbec6a68824bff59e:src/jspm_config.js
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

