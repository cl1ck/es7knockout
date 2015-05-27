import KnockoutApplication from './KnockoutApplication';

describe('KnockoutApplication', () => {
    it('allows to set and get valid configuration contexts', () => {
        let app = new KnockoutApplication();
        assert.equal(KnockoutApplication.getContext(), 'global');
        assert.doesNotThrow(() => {
            KnockoutApplication.setContext('dev');
        });
        assert.equal(KnockoutApplication.getContext(), 'dev');
        assert.throws(() => {
            KnockoutApplication.setContext('nocontext');
        });
    });

    it('will bind app to DOM', () => {
        let app = new KnockoutApplication();
        assert.doesNotThrow(() => {
            app.run();
        });
        assert.doesNotThrow(() => {
            app.run();
        });
    });
});
