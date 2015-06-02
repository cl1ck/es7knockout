import AJAX from './AJAX';
import Config from '../app/AppConfig';
//import sinon from 'sinon';

Config.setContext('dev');

describe('AJAX', () => {
    beforeEach(function () {
        this.xhr = sinon.useFakeXMLHttpRequest();
        var requests = this.requests = [];
        this.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    afterEach(function () {
        this.xhr.restore();
    });

    it('allows ajax requests', function() {
        let callback = sinon.spy();
        let errorCb = sinon.spy();
        let data = { 'request': true };
        let p = AJAX.request(data).then((response) => {
            callback(response);
            assert(callback.calledWith([ { test: 'test '}]));
        }).catch((error) => {
            errorCb(error);
        });

        let request = this.requests[0];

        assert.equal(this.requests.length, 1);
        assert.equal(request.requestBody, JSON.stringify(data));
        request.respond(200, {'Content-Type': 'application/json'},
            '[{ "test": "test" }]');
    });
});
