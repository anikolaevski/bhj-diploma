/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) { throw "Empty element"; }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    this.element.addEventListener('submit', function(evt) {
      evt.preventDefault();
      this.submit();
    }.bind(this));
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    const data = {};
    const formData = new formData(this);
    const entries = formData.entries;
    for (let item of entries) {
      const key = item[0],
        value = item[1];
        data[key] = value;
    }

    // const data = {};
    // const inputs = this.querySelectorAll('input');
    // for (let k = 0; k < inputs.length; k++) {
    //   const name = inputs[k].getAttribute('name');
    //   const value = inputs[k].value;
    //   data[name] = value;
    // }
    return data;
  }

  onSubmit(options) {

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}