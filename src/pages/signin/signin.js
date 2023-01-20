import { Block } from '../../utils/Block.js';
import AuthButton from '../../components/AuthButton/AuthButton.js';
import AuthInput from '../../components/AuthInput/AuthInput.js';
import * as styles from './signin.module.css';


class Signin extends Block {
  constructor(props) {
    super({
      ...props,
      styles,
      isFormInvalid: true,
      isButtonDisabled: 'disabled',
      onFocusout: (e) => this.handleFocusout(e),
      onChange: (e) => this.handleChange(e),
      events: {
        submit: (e) => this.handleSubmit(e)
      }
    });
  }

  handleFocusout(event) {
    const { name, value } = event.target;
    this.setProps({
      formValues: {
        ...this.props.formValues,
        [name]: value
      }
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setProps({
      errors: {
        ...this.props.errors,
        [name]: this.props.validateInput(name, value)
      }
    });
    this.setProps({
      isFormInvalid: this.props.validateForm(['login', 'password'], this.props.errors),
      isButtonDisabled: !this.props.validateForm(['login', 'password'], this.props.errors) ? '' : 'disabled'
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {login, password} = this.props.formValues
    console.log('SUBMIT', {login: login, password: password});
  }

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof AuthInput) {
        component.setProps({
          value: newProps.formValues[component.props.name],
          errors: newProps.errors[component.props.name],
        });
      }
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: newProps.isButtonDisabled,
        });
      }
    });
    return false;
  }

  render() {
    return `
      <main class="{{styles.signin}}">
        <form
          class="{{styles.form}}"
        >
          <h1 class="{{styles.title}}">Войти</h1>
          <fieldset class="{{styles.inputs}}">
            {{{
              AuthInput
                label="Логин"
                name="login"
                type="text"
                errorMessage="Введите от 3 до 20 символов латиницей без пробелов и без спецсимволов"
                value=formValues.login
                errors=errors.login
                onFocusout=onFocusout
                onChange=onChange
            }}}
            {{{
              AuthInput
                label="Пароль"
                name="password"
                type="password"
                errorMessage="Пароль не введен или не соответствует формату"
                value=formValues.password
                errors=errors.password
                onFocusout=onFocusout
                onChange=onChange
            }}}
          </fieldset>
          {{{
            AuthButton
              buttonText="Авторизоваться"
              isFormInvalid=isFormInvalid
              isButtonDisabled=isButtonDisabled
          }}}
          <p onclick="renderPage('signup')" class="{{styles.btn}}">
            Нет аккаунта?
          </p>
        </form>
      </main>
    `
  }
}

export default Signin;
