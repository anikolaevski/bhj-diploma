// const {createRequest} = require('createRequest');
/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = '/account/';

  static get(id = '', callback){
    this.list({
      url: `${this.URL}${id}`,
      method: 'GET',
      data: {},
      callback: callback
    });
  }
}
