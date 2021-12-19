/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.login(data, (err, response) => {
      console.log(19, 'err:', err, 'response:', response);
      if (response && response.success && response.user) {
        // console.log(21, response.user);
        User.setCurrent(response.user);
        const modal = App.getModal('login');
        if (modal) {
          modal.close();
        }
      } else {
        User.unsetCurrent();
      }
    });
  }
}