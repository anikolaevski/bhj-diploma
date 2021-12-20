/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, (err, response) => {
      // console.log(14, 'err:', err, 'response:', response);
      if (response && response.success && response.user) {
        // console.log(16, response.user);
        User.setCurrent(response.user);
        App.setState('user-logged');
        const modal = App.getModal('register');
        if (modal) {
          modal.close();
        }
      } else {
        User.unsetCurrent();
        App.setState('init');
      }
    });
  }
}