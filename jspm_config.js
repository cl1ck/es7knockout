System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ],
    "stage": 1
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
    "chai": "npm:chai@2.3.0",
    "chai-as-promised": "npm:chai-as-promised@5.0.0",
    "core-js": "npm:core-js@0.9.6",
    "jquery": "github:components/jquery@2.1.4",
    "knockout": "github:knockout/knockout@3.3.0",
    "sinon": "npm:sinon@1.14.1",
    "socket.io-client": "github:Automattic/socket.io-client@1.3.5",
    "systemjs/plugin-text": "github:systemjs/plugin-text@0.0.2",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.2.2"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@3.2.2": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.5",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:chai-as-promised@5.0.0": {
      "chai": "npm:chai@2.3.0"
    },
    "npm:chai@2.3.0": {
      "assertion-error": "npm:assertion-error@1.0.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "deep-eql": "npm:deep-eql@0.1.3",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-js@0.9.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:deep-eql@0.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "type-detect": "npm:type-detect@0.1.1"
    },
    "npm:formatio@1.1.1": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "samsam": "npm:samsam@1.1.2"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:sinon@1.14.1": {
      "formatio": "npm:formatio@1.1.1",
      "lolex": "npm:lolex@1.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "util": "npm:util@0.10.3"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

