import config from '../config';

/**
 * Access configuration for current app config.
 */
class AppConfig {
    constructor() {
        this.context = 'global';
    }

    /**
     * Get configuration property in the current app context
     * @param {string} prop name of the property to get
     * @returns {string} -
     */
    get(prop) {
        if (prop in config[this.context]) {
            return config[this.context][prop];
        }

        if (prop in config.global) {
            return config.global[prop];
        }

        throw new Error('Config value "' + prop + '" is neither in "global" nor in current context "' +
            this.context + '"!');
    }

    hasContext(context) {
        return config[context] !== undefined;
    }

    setContext(newContext) {
        if (!this.hasContext(newContext)) {
            throw new Error('Context ' + newContext + ' does not exist!');
        }
        this.context = newContext;
    }

    getContext() {
        return this.context;
    }

    setValue(key, value, forContext = undefined) {
        let context = forContext ? forContext : this.context;

        if (!config[context]) {
            config[context] = {};
        }

        config[context][key] = value;
    }
}

export default new AppConfig();
