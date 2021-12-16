/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
export const createRequest = (options = {}) => {
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

    xhr.addEventListener('readystatechange', function(err, data) {
        if( this.readyState == this.DONE ) {
            callback(err, data);
        }
    });

    if (method === 'GET') {
            xhr.send();
    } else {
        xhr.send(dataObject.formData);
    }

};
