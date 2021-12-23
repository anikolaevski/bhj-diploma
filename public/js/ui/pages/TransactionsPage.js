/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    // console.log(14, 'create');
    if (!element) {
      throw {error: 'Передан пустой элемент!'};
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    // console.log(26, 'update');
    this.getSelectedAccount((e,d) => {
      if (e.error) {
        return;
      }
      this.render(d);
    });
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    
    // Удаление аккаунта
    this.element.querySelector('.remove-account').addEventListener('click', (evt) => {
      evt.preventDefault();
      this.getSelectedAccount((e,d) => {
        // console.log(40, e, d);
        if (e.error) {
          console.log(e.error);
          return;
        }
        console.log(`Удаление ${d.id} ${d.name}`);
        this.removeAccount(d);
      });
    });
    const trs = this.element.querySelectorAll('.transaction__remove');
    console.log(trs);
    for (let k = 0; k < trs.length; k++) {
      trs[k].addEventListener('click', (evt) => {
        evt.preventDefault();
        console.log(58, evt.currentTarget);
      });
    }
 }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount(obj) {
    const modal = App.getModal('deleteAccount'); 
    modal.element.querySelector('#delete-account-id').value = obj.id;
    modal.element.querySelector('.user-account-name').innerText = `"${obj.name}"`;
    modal.element.querySelector('#delete-account-check').checked = false;
    modal.open();
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( obj ) {
    console.log(89, obj);
    const modal = App.getModal('deleteTransaction');
    modal.element.querySelector('#delete-transaction-id').value = obj.id;
    modal.element.querySelector('.user-transaction-name').innerText = `"${obj.name}"`;
    modal.element.querySelector('#delete-transaction-check').checked = false;
    modal.open();
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    // consoles.log(options);
    if (!options['id']) { return; }
    this.lastOptions = options;
    this.renderTitle(options.name);
    Transaction.list({account_id: options.id}, (e,d) => {
      this.renderTransactions(d.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {

  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    document.querySelector('.content-title').textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    const dt = {
      year: parseInt(date.substr(0,4),10),
      month: parseInt(date.substr(5,2),10),
      day: parseInt(date.substr(8,2),10),
      hour: parseInt(date.substr(11,2),10),
      minute: parseInt(date.substr(14,2),10),
      second: parseInt(date.substr(17,2),10)
    }
    return luxon.DateTime.fromObject(dt).toFormat('yyyy-MM-dd HH:mm:ss');
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    // console.log(item);
    return `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
          <!--  сумма -->
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
      </div>
    </div>
    `;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    const content = this.element.querySelector('.content');
    content.innerHTML = '';
    for (let k = 0; k < data.length; k++) {
      const html = this.getTransactionHTML(data[k]);
      content.insertAdjacentHTML('beforeend', html);
    }
    const trs = content.querySelectorAll('.transaction__remove');
    console.log(trs);
    for (let k = 0; k < trs.length; k++) {
      trs[k].addEventListener('click', (evt) => {
        evt.preventDefault();
        const id = evt.currentTarget.getAttribute('data-id');
        const title = evt.currentTarget.parentNode.parentNode
        .querySelector('.transaction__title').innerText;
          // console.log(199, title);
        this.removeTransaction({id: id, name: title});
      });
    }
  }

    /**
   * Новый метод:
   * Получение текущего аккаунта
   * */
  getSelectedAccount(callback) {
    const accountActive = document.querySelector('.account.active');
    if (accountActive) {
      const id = accountActive.getAttribute('data-id');
      Account.get(id, function (e,d) {
        callback(e, d.data);
      });
    } else if (this.lastOptions) {
      callback({error: null}, this.lastOptions);
    } else {
      callback({error: 'Не выбран аккаунт'}, null);
    }
  }
}