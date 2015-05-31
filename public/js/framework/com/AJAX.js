import $ from 'jquery';
import config from '../app/ContextConfig';

class AJAX {
    constructor() {
        $.support.cors = true;
        this.token = null;
        this.allowAjaxRequests = true;
    }

    async request(payload = {}, type = 'json') {
        let contentType;
        let processData;
        let requestData;
        let ajaxConfig;

        if (!this.allowAjaxRequests && auth) {
            throw new Error('authenticated AJAX requests are only allowed when logged in');
        }

        // pre-process request data
        if (type === 'json') {
            contentType = 'application/json charset=UTF-8';
            processData = true;
            requestData = JSON.stringify(payload);
        } else if (type === 'form') {
            contentType = 'application/x-www-form-urlencoded charset=UTF-8';
            processData = true;
            requestData = payload;
        } else if (type === 'file') {
            contentType = false;
            processData = false;
            // todo: create form data
            requestData = payload;
        }

        ajaxConfig = {
            context: this,

            // current retry count:
            retryCounter: 0,

            // max retries:
            retryLimit: 10,

            // timeout for first retry:
            retryTimeout: 1,

            // increase waiting time for next retry:
            increaseTimeoutOnRetry: 100,

            // current manual retry:
            manualRetryCounter: 0,

            // limit manual retries:
            manualRetryLimit: 5,

            // number of automatic retries for each manual retry:
            manualAdditionalRetries: 5,

            // always use post to prevent caching
            type: 'POST',

            // never cache
            cache: false,

            // set request endpoint from config
            url: config.get('apiEndpoint'),

            // append request data
            data: requestData,

            // response should always be json
            dataType: 'json',

            // set timeout from config
            timeout: config.get('ajaxTimeout'),

            // process data depending on request type
            contentType: contentType,
            processData: processData,

            // always allow CORS
            crossDomain: true
        };

        let response = await $.ajax(ajaxConfig);

        // if response did not get parsed correctly by jQuery, parse it manually
        if (typeof response !== 'object') {
            response = JSON.parse(response);
        }

        return response;
    }
}

let instance = new AJAX();

export default instance;
