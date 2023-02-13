import { Block } from '../../utils/Block';
import AuthButton from '../../components/AuthButton/AuthButton';
import AuthInput from '../../components/AuthInput/AuthInput';
import * as styles from './signin.module.css';

type Props = {
  [key: string]: unknown
}

class Signin extends Block {
  constructor(props: Props) {
    super({
      ...props,
      styles,
      isLoginInvalid: () => Object.values(this.props.errors.login).some(v => v === false),
      isPasswordInvalid: () => Object.values(this.props.errors.password).some(v => v === false),
      isFormInvalid: () => this.props.isLoginInvalid() || this.props.isPasswordInvalid(),
      isButtonDisabled: 'disabled',
      onChange: (e: Event) => this.handleChange(e),
      events: {
        submit: (e: Event) => this.handleSubmit(e)
      }
    });

  }

  handleChange(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    this.setProps({
      formValues: {
        ...this.props.formValues,
        [name]: value
      }
    });
    this.setProps({
      errors: {
        ...this.props.errors,
        [name]: this.props.validateInput(name, value)
      }
    });
    this.setProps({
      isButtonDisabled: !this.props.isFormInvalid() ? '' : 'disabled'
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    const {login, password} = this.props.formValues
    console.log('SUBMIT', {login: login, password: password});
  }

  componentDidUpdate(oldProps: any, newProps: any) {
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
