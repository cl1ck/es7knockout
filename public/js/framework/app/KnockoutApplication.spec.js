import KnockoutApplication from './KnockoutApplication';
import Config from './AppConfig';

describe('KnockoutApplication', () => {
    it('will bind app to DOM once', () => {
        let app = new KnockoutApplication();

        assert.doesNotThrow(() => {
            app.run();
        });
        assert.doesNotThrow(() => {
            app.run();
        });
    });
});
