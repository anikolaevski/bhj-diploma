/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    // console.log(data);
    const modal = App.getModal('createAccount');
    const widget = App.getWidget('accounts');
    Account.create(data, (error, response) => {
      modal.close();
      widget.update();
      // console.log(error, response);
    });
    
  }
}