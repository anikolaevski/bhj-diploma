/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const body = document.querySelector('body');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebarToggle.classList.remove('visible-xs');
    body.classList.add('sidebar-open');
    // body.classList.add('sidebar-collapse');
    sidebarToggle.addEventListener('click', function() {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const modal = App.getModal('login');
    const menuItemLogin = document.querySelector('.menu-item_login a');
    const menuItemRegister = document.querySelector('.menu-item_register a');
    const menuItemLogout = document.querySelector('.menu-item_logout a');
    menuItemLogin.addEventListener('click', function(evt) {
      evt.preventDefault();
      const modal = App.getModal('login');
      modal.open();
    });
    menuItemRegister.addEventListener('click', function(evt) {
      const modal = App.getModal('register');
      modal.open();
    });
    menuItemLogout.addEventListener('click', function(evt) {
      evt.preventDefault();
      User.logout(() => {console.log('logout');});
    });
    User.fetch(() => {
      const x = User.current();
      if (!x) {
        modal.open();
      }
    });
  }
}
