System.config({
  "transpiler": "6to5",
  "paths": {
    "*": "*.js",
    "buildit/*": "src/js/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

