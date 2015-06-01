import Config from './AppConfig';

define('AppConfig', () => {
    it('allows access to config values', () => {
        assert.isFalse(Config.get('debug'));
    });
});
