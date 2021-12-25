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
    if (data.isAgree) {
      Account.remove(data, (error, response) => {
        // console.log(error, response);
        location.reload();
      });      
    }
    modal.close();
  }
}