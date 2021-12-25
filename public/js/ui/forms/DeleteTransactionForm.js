/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class DeleteTransactionForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    // console.log(data);
    const modal = App.getModal('deleteTransaction');
    if (data.isAgree) {
      Transaction.remove(data, (error, response) => {
        App.update();
        // console.log(error, response);
      });      
    }
    modal.close();
  }
}