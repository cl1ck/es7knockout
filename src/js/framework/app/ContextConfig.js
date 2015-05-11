import config from '../config';
import context from './AppContext';

/**
 * Access configuration for current app config.
 */
export default class ContextConfig {
    /**
     * Get configuration property in the current app context
     * @param prop name of the property to get
     */
    static get(prop) {
        let activeContext = context.getContext();

        if (prop in config[activeContext ]) {
            return config[activeContext ][prop];
        }

        if (prop in config['global']) {
            return config['global'][prop];
        }

        throw 'config value "' + prop + "' does not exist";
    }
}
