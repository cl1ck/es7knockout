import Event from './Event';
import Component from '../ko/Component';

class Child extends Component {
    constructor(params) {
        super(params);
        this.receivedEvent = false;
        this.on('event', () => {
            this.receivedEvent = true;
        });
    }

    emitTest() {
        this.emit('childEvent');
    }
}

class Parent extends Component {
    constructor(params) {
        super(params);
        this.on('childEvent', (event) => {
            event.notifyOrigin('event');
        });
    }
}

describe('event', () => {
    it('has name, data, stopped and bubble properties', () => {
        let event = new Event('test', 'origin');
        assert.isDefined(event.name);
        assert.isDefined(event.data);
        assert.isDefined(event.stopped);
        assert.isDefined(event.bubble);
    });

    it('stops event', () => {
        let event = new Event('test', 'origin');
        assert.isFalse(event.stopped);
        event.stop();
        assert.isTrue(event.stopped);
    });

    it('stores handlers', () => {
        let event = new Event('test', 'origin');
        event.handledBy('handler');
        assert.isTrue(event.gotHandledBy('handler'));
    });

    it('can notify it\s origin', () => {
        let parent = new Parent({
            id: 'parent'
        });
        let child = new Child({
            id: 'child',
            parent: parent
        });
        assert.isFalse(child.receivedEvent);
        child.emitTest();
        assert.isTrue(child.receivedEvent);
    });
});
