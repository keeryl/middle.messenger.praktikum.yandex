import { Block } from '../../utils/Block.js';
import AuthButton from '../../components/AuthButton/AuthButton.js';
import AuthInput from '../../components/AuthInput/AuthInput.js';
import * as styles from './Signup.module.css';


class Signup extends Block {
  constructor(props) {
    super({styles, props});
  }

  render() {
    return `
      <main class="{{styles.signup}}">
        <form class="{{styles.form}}">
          <h1 class="{{styles.title}}">Регистрация</h1>
          <fieldset class="{{styles.inputs}}">
            {{{ AuthInput label="Почта" name="email" type="email" }}}
            {{{ AuthInput label="Логин" name="login" type="text" }}}
            {{{ AuthInput label="Имя" name="first_name" type="text" }}}
            {{{ AuthInput label="Фамилия" name="second_name" type="text" }}}
            {{{ AuthInput label="Телефон" name="phone" type="tel" }}}
            {{{ AuthInput label="Пароль" name="password" type="password" }}}
            {{{ AuthInput label="Пароль (ещё раз)" name="password" type="password" }}}
          </fieldset>
          {{{ AuthButton buttonText="Зарегистрироваться" }}}
          <p onclick="renderPage('signin')" class="{{styles.btn}}">Войти</p>
        </form>
      </main>
    `
  }
}

export default Signup;

