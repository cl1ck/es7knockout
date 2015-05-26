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
     * @param {boolean} bubble
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
     */
    stop() {
        this.stopped = true;
    }

    /**
     * Send event to the origin of this event
     * @param eventName name of the event to send
     * @param data event payload
     */
    notifyOrigin(eventName, data = null) {
        let event = new Event(eventName, this.origin, data, false);
        EventBus.notify(this.origin, event);
    }

    /**
     * Notify event that it got handled by a given component
     * @param id ID of the component that handled the event
     */
    handledBy(id) {
        this.handlers.add(id);
    }

    /**
     * Check if event got handled by a given component
     * @param id ID of the component to check
     * @returns {boolean}
     */
    gotHandledBy(id) {
        return this.handlers.has(id);
    }
}
