import $ from 'jquery';
import Config from '../app/AppConfig';

class AJAX {
    ajax(config, callback, errorCallback) {
        let xhr = new XMLHttpRequest();
        let timeout = setTimeout(() => {
            xhr.abort();
            errorCallback('AJAX Timeout');
            // todo: retry logic here
        }, config.timeout);

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return;
            }
            clearTimeout(timeout);

            if (xhr.status !== 200) {
                errorCallback(`AJAX Error: ${xhr.status} ${xhr.statusText}`);
                return;
            }

            if (xhr.readyState === 4) {
                let response = config.responseType === 'json' ?
                               response = JSON.parse(xhr.responseText) :
                               response = xhr.responseText;

                callback(response);
            }
        };

        xhr.open('POST', config.url, true);
        xhr.setRequestHeader("Content-Type", config.contentType);
        xhr.send(config.data);
    }

    request(payload = {}, type = 'json') {
        let contentType;
        let requestData;
        let apiEndpoint = Config.get('apiEndpoint');
        let timeout = Config.get('AJAXTimeout');

        // pre-process request data
        if (type === 'json') {
            contentType = 'application/json charset=UTF-8';
            requestData = JSON.stringify(payload);
        } else if (type === 'form') {
            contentType = 'application/x-www-form-urlencoded charset=UTF-8';
            requestData = payload;
        } else if (type === 'file') {
            contentType = false;
            requestData = payload;
        }

        let ajaxConfig = {
            url: apiEndpoint,
            contentType: contentType,
            data: requestData,
            responseType: 'json',
            timeout: timeout
        };

        return new Promise((resolve, reject) => {
            this.ajax(ajaxConfig, resolve, reject);
        });
    }
}

let instance = new AJAX();

export default instance;
