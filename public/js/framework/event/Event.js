import EventBus from './EventBus';

/**
 * An event for inter-component communication
 */
export default class Event {
    /**
     * Constructor
     * @param {string} name event name
     * @param {string} origin ID of origin node
     * @param {object} data event data
     * @param {boolean} bubble true if event is allowed to bubble up
     * @returns {Event} -
     */
    constructor(name, origin, data = null, bubble = true) {
        this.name = name;
        this.origin = origin;
        this.data = data;
        this.stopped = false;
        this.bubble = bubble;
        this.handlers = new Set();
    }

    /**
     * Stop the event from further processing.
     * @returns {undefined} -
     */
    stop() {
        this.stopped = true;
    }

    /**
     * Send event to the origin of this event
     * @param {string} eventName name of the event to send
     * @param {*} data event payload
     * @returns {undefined} -
     */
    notifyOrigin(eventName, data = null) {
        let event = new Event(eventName, this.origin, data, false);

        EventBus.notify(this.origin, event);
    }

    /**
     * Notify event that it got handled by a given component
     * @param {Symbol} id ID of the component that handled the event
     * @returns {undefined} -
     */
    handledBy(id) {
        this.handlers.add(id);
    }

    /**
     * Check if event got handled by a given component
     * @param {Symbol} id ID of the component to check
     * @returns {boolean} true if event got handled by given ID
     */
    gotHandledBy(id) {
        return this.handlers.has(id);
    }
}
