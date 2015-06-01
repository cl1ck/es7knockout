import Config from './AppConfig';

describe('AppConfig', () => {
    it('allows access to config values', () => {
        assert.isFalse(Config.get('debug'));
        assert.equal(Config.getContext(), 'global');
        Config.setContext('dev');
        assert.equal(Config.getContext(), 'dev');
        assert.isTrue(Config.get('debug'));
        assert.equal(Config.get('AJAXTimeout'), 5000);
        assert.throws(() => {
            Config.get('bla')
        });
        Config.setValue('test', 'test');
        assert.equal(Config.get('test'), 'test');
        assert.throws(() => {
            Config.setContext('bla')
        });
        Config.setValue('bla', 'bla', 'bla');
        assert.throws(() => {
            Config.get('bla')
        });
        assert.doesNotThrow(() => {
            Config.setContext('bla');
        });
        assert.throws(() => {
            Config.get('test');
        });
        assert.equal(Config.get('bla'), 'bla');
    });
});
