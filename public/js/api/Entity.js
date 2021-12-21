// const {createRequest} = requie('createRequest');
/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = '';
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    const sendData = {};
    let url = this.URL;
    Object.assign(sendData, data);
    if (data['url']) {
      url = data.url;
      delete data.url;
    }
    let Callback = callback;
    if (data['callback']) {
      Callback = data.callback;
    }
    // console.log(21, url, sendData);
    createRequest({
      url: url,
      method: 'GET',
      data: sendData,
      callback: Callback
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    createRequest({
      url: this.URL,
      method: 'PUT',
      data: data,
      callback: callback
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.URL,
      method: 'DELETE',
      data: data,
      callback: callback
    });
  }
}
