import { Block } from '../../utils/Block.js';
import AuthButton from '../../components/AuthButton/AuthButton.js';
import AuthInput from '../../components/AuthInput/AuthInput.js';
import * as styles from './signin.module.css';


class Signin extends Block {
  constructor(props) {
    super({
      ...props,
      styles,
    });
  }

  render() {
    return `
      <main class="{{styles.signin}}">
        <form class="{{styles.form}}">
          <h1 class="{{styles.title}}">Войти</h1>
          <fieldset class="{{styles.inputs}}">
            {{{ AuthInput label="Логин" name="login" type="text" }}}
            {{{ AuthInput label="Пароль" name="password" type="password" }}}
          </fieldset>
          {{{ AuthButton buttonText="Авторизоваться" }}}
          <p onclick="renderPage('signup')" class="{{styles.btn}}">
            Нет аккаунта?
          </p>
        </form>
      </main>
    `
  }
}

export default Signin;
