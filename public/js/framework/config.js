export default {
    global: {
        debug: false,
        AJAXTimeout: 5000,
        apiEndpoint: 'http://localhost:8080/public/api.php'
    },
    dev: {
        debug: true,
        apiEndpoint: 'http://localhost:8080/public/api.php'
    }
};
