import Config from './AppConfig';

describe('AppConfig', () => {
    it('allows access to config values', () => {
        Config.setContext('global');
        assert.isFalse(Config.get('debug'));
    });

    it('allows to get and set context', () => {
        assert.equal(Config.getContext(), 'global');
        Config.setContext('dev');
        assert.equal(Config.getContext(), 'dev');
        assert.isTrue(Config.get('debug'));
        assert.throws(() => {
            Config.setContext('bla');
        });
    });

    it('returns values depending on current context', () => {
        assert.equal(Config.get('AJAXTimeout'), 5000);
        assert.throws(() => {
            Config.setContext('dev');
            Config.get('bla');
        });

        Config.setValue('test', 'test');
        assert.equal(Config.get('test'), 'test');
    });

    it('allows to set new values', () => {
        Config.setValue('bla', 'bla', 'bla');
        assert.throws(() => {
            Config.setContext('dev');
            Config.get('bla');
        });
        assert.doesNotThrow(() => {
            Config.setContext('bla');
            Config.get('bla');
        });
        assert.throws(() => {
            Config.setContext('bla');
            Config.get('test');
        });
        assert.equal(Config.get('bla'), 'bla');
    });

});
