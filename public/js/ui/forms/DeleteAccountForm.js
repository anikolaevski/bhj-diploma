/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class DeleteAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    console.log(data);
    const modal = App.getModal('deleteAccount');
    const widget = App.getWidget('accounts');
    if (data.isAgree) {
      Account.remove(data, (error, response) => {
        widget.update();
        console.log(error, response);
      });      
    }
    modal.close();
  }
}