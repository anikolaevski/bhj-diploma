/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const user = User.current();
    Account.list({id: user.id}, (e,d) => {
      if (e.error) {
        console.log(e);
      }
      const incomeAccountsLlist = document.querySelector('#income-accounts-list');
      const expenseAccountsLlist = document.querySelector('#expense-accounts-list');
      incomeAccountsLlist.innerHTML = '';
      expenseAccountsLlist.innerHTML = '';
      for (const row of d.data) {
        // Добавление аккаунта в селекторы формы
        const option=`<option value=${row.id}>${row.name}</option>`;
        incomeAccountsLlist.insertAdjacentHTML('beforeend', option);
        expenseAccountsLlist.insertAdjacentHTML('beforeend', option);
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    let modalName = '';
    switch (data.type) {
      case 'income':
        modalName = 'newIncome';
        break;
      case 'expense':
        modalName = 'newExpense';
        break;
    }
    const modal = App.getModal(modalName);
    console.log(data, modalName);
    
    Transaction.create(data, (error, response) => {
      console.log(error, response);
      if (response.success) {
        modal.close();
        setTimeout(() => {
          App.showPage( 'transactions', { account_id: data.account_id });
          App.update();
        }, 500);
      } else {
        throw error;
      }
    });

  }
}