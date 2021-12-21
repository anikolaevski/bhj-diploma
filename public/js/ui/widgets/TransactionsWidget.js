/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    try {
      this.element = element;
      this.registerEvents();      
    } catch (err) {
      throw err;
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const createIncomeButton = this.element.querySelector('.create-income-button');
    const createExpensButton = this.element.querySelector('.create-expense-button');
    createIncomeButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const modal = App.getModal('newIncome');
      modal.open();
    });
    createExpensButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      const modal = App.getModal('newExpense');
      modal.open();
    });
  }
}
