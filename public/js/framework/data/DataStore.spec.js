import DataStore from './DataStore';

class MyStore extends DataStore {
    constructor() {
        super('MyStore');
        this.testValue = true;
        this.importObservables();
    }
}

describe('DataStore', () => {
    it('provides a list of properties', () => {
        let store = new MyStore();

        assert.sameMembers(store.provides(), ['testValue']);
    });
});
