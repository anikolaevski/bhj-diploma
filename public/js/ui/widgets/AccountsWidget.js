/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.querySelector('.create-account').addEventListener('click', function (evt) {
      evt.preventDefault();
      const modal = App.getModal('createAccount');
      modal.open();
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    const user = User.current();
    if (user) {
      Account.list({id: user.id}, (e,d) => {
        if (e.error) {
          console.log(e);
        }
        this.renderItem(d);
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accounts = this.element.querySelectorAll('.account');
    // console.log(accounts);
    for ( let k = accounts.length - 1; k >= 0; k-- ) {
      accounts[k].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    const accounts = this.element.querySelectorAll('.account');
    for ( let k = 0; k < accounts.length; k++ ) {
      accounts[k].classList.remove('active');
    }
    element.classList.add('active');
    const id=element.getAttribute('data-id');
    // setTimeout(() => {
      // console.log(element, id);
      App.showPage( 'transactions', { account_id: id });
      App.update();
    // }, 200);
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const nf = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });
    return `    <li class="account" data-id="${item.id}">
      <a href="#">
          <span>${item.name}</span> /
          <span>${nf.format(item.sum)} ₽</span>
      </a>
    </li>`
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    this.clear();
    const incomeAccountsLlist = document.querySelector('#income-accounts-list');
    const expenseAccountsLlist = document.querySelector('#expense-accounts-list');
    incomeAccountsLlist.innerHTML = '';
    expenseAccountsLlist.innerHTML = '';
    for (const row of data.data) {
      // Добавление аккаунта на боковую панель
      const html = this.getAccountHTML(row);
      this.element.insertAdjacentHTML('beforeend', html);
      // // Обновление селекторов формы
      const option=`<option value=${row.id}>${row.name}</option>`;
      incomeAccountsLlist.insertAdjacentHTML('beforeend', option);
      expenseAccountsLlist.insertAdjacentHTML('beforeend', option);
    }
    const accounts = this.element.querySelectorAll('.account');
    for ( let k = 0; k < accounts.length; k++ ) {
      accounts[k].addEventListener('click', function (evt) {
        evt.preventDefault();
        this.onSelectAccount(evt.currentTarget);
      }.bind(this));
    }
  }
}
