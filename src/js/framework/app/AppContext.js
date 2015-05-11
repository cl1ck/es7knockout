import config from '../config';

/**
 * Manage application contexts (e.g. 'dev' or 'produciton')
 */
class AppContext {
    /**
     * Set default context
     */
    constructor() {
        this.context = 'global';
    }

    /**
     * Set new context
     * @param newContext the new context
     */
    setContext(newContext) {
        if (!config[newContext]) {
            throw 'config context ' + newContext + ' not available';
        }
        this.context = newContext;
    }

    /**
     * Get current app context
     * @returns {string}
     */
    getContext() {
        return this.context;
    }
}

// export Singleton
var instance = new AppContext();
export default instance;
