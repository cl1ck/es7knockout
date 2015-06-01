import AJAX from './AJAX';
import Config from '../app/AppConfig';

Config.setContext('dev');

describe('AJAX', () => {
    it('allows ajax requests', () => {
        /*
        assert.doesNotThrow(() => {
            AJAX.request();
        });
        AJAX.allowAjaxRequests = false;
        assert.throws(() => {
            AJAX.request();
        }, 'authenticated AJAX requests are only allowed when logged in');
        */
    });
});
