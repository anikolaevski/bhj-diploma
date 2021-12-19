/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
 const createRequest = (options = {}) => {
    const {url, data, method, callback} = options;
    const xhr = new XMLHttpRequest;
    const dataObject = {
        hash: '',
        formData: new FormData()
    };
    if (method === 'GET') {
        Object.keys(data).forEach(o => {
            if(!dataObject.hash.trim()) {
                dataObject.hash += '?';
            } else {
                dataObject.hash += '&';
            }
            dataObject.hash += `${o}=${data[o]}`;
        });
        xhr.open(method, url + dataObject.hash);
    } else {
        Object.keys(data).forEach(o => {
            dataObject.formData.append(o, data[o]);
        });
        xhr.open(method, url);
    }
    xhr.responseType = 'json';

    xhr.addEventListener('readystatechange', function() {
        if( this.readyState == this.DONE ) {
            let err = {error: null}, data = {};
            // console.log(33, this);
            if (this.status === 200) {
                data = this.response;
            } else {
                err = this.response;
            }
            // console.log(39, 'err:', err, 'data:', data);
            callback(err, data);
        }
    });

    if (method === 'GET') {
            xhr.send();
    } else {
        xhr.send(dataObject.formData);
    }

};
