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
        if (config[this.context] && config[this.context][prop]) {
            return config[this.context][prop];
        }

        if (config.global && config.global[prop]) {
            return config.global[prop];
        }

        throw new Error('Config value ' + prop + ' is not set!');
    }

    setContext(newContext) {
        this.context = newContext;
    }

    getContext() {
        return this.context;
    }
}

export default new AppConfig();
