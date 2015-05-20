import Component from './Component';
import ko from 'knockout';

class ComponentTest extends Component {
    constructor(params) {
        super(params, 'test', 'observable');
    }
}

class EventTestParent extends Component {
    constructor(params) {
        super(params);
        this.test = 'test';
        this.importObservables();
        this.on('testEvent', () => {
            this.test = 'testEvent';
        });
    }
}

class EventTestChild extends Component {
    constructor(params) {
        super(params);
    }

    sendTestEvent() {
        this.emit('testEvent');
    }
}

describe('Component', function () {
    it('requires an id', function () {
        let fn = function () {
            return new Component();
        };
        assert.throws(fn, 'each component must have an "id" param');
    });

    it('requires given parameters', function () {
        let fn = function () {
            return new ComponentTest({
                id: 'myid'
            });
        };
        assert.throws(fn, 'required parameter "test" is missing');
        fn = function () {
            return new ComponentTest({
                id: 'myid',
                test: 'test'
            });
        };
        assert.throws(fn, 'required parameter "observable" is missing');
    });

    it('imports common values and observables', function () {
        let comp = new ComponentTest({
            id: 'myid',
            test: 'testvalue',
            observable: ko.observable('obsvalue'),
            computed: ko.pureComputed(function () {
                return 'test';
            })
        });

        assert.equal(comp.test, 'testvalue');
        assert.equal(comp.$test, undefined);
        assert.equal(comp.observable, 'obsvalue');
        assert.isTrue(ko.isObservable(comp.$observable));
        assert.isTrue(ko.isComputed(comp.$computed));
        assert.equal(comp.$observable(), 'obsvalue');
        assert.equal(comp.computed, 'test');
        assert.throws(function () { comp.computed = 1});
        assert.throws(function () { comp.test = 'newvalue'});
    });

    it('imports and registers with parent components', function() {
        let child;
        let childError;
        let parent = new ComponentTest({
            id: 'parent',
            test: 'test',
            observable: 'observable'
        });
        assert.doesNotThrow(() => {
            child = new ComponentTest({
                id: 'child',
                parent: parent,
                test: 'test',
                observable: 'observable'
            });
        });
        assert.throws(() => {
            childError = new ComponentTest({
                id: 'childError',
                parent: 'test',
                test: 'test',
                observable: 'observable'
            });
        }, 'parent must be an instance of Component');
        assert.isTrue(parent.hasChild('child'));
    });

    it('sends events to childs', function() {
        let parent = new EventTestParent({
            id: 'parent'
        });
        let child = new EventTestChild({
            id: 'child',
            parent: parent
        });
        assert.equals(parent.test, 'test');
    });
});
