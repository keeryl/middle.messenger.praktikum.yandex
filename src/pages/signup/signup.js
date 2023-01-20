import { Block } from '../../utils/Block.js';
import AuthButton from '../../components/AuthButton/AuthButton.js';
import AuthInput from '../../components/AuthInput/AuthInput.js';
import InputErrorMessage from '../../components/InputErrorMessage/InputErrorMessage.js';
import * as styles from './Signup.module.css';

class Signup extends Block {

  constructor(props) {
    super({
      ...props,
      error: '',
      styles,
      isFormInvalid: true,
      isButtonDisabled: 'disabled',
      onFocusout: (e) => this.handleFocusout(e),
      onChange: (e) => this.handleChange(e),
      events: {
        submit: (e) => this.onSubmit(e)
      },
    });
    this.formValues = {}
    this.isMatch = () => this.checkPassword()
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('SUBMIT', this.props.formValues);
  }

  checkPassword() {
    return this.formValues.password === this.formValues.passwordCheck
  }

  handleFocusout(event) {
    const { name, value } = event.target;
    this.setProps({
      formValues: {
        ...this.props.formValues,
        [name]: value
      }
    });
    this.setProps({
      error: this.isMatch() ? '' : 'Пароли не совпадают'
    })
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.formValues = {...this.formValues, [name]: value}
    this.setProps({
      errors: {
        ...this.props.errors,
        [name]: this.props.validateInput(name, value)
      }
    });
    this.setProps({
      isFormInvalid: this.props.validateForm(
        ['email','login','first_name','second_name','phone','password','passwordCheck'],
        this.props.errors
      ),

    });

    this.setProps({
      isButtonDisabled: !this.props.validateForm(
        ['email','login','first_name','second_name','phone','password','passwordCheck'],
        this.props.errors) && this.isMatch() ? '' : 'disabled',
    })

    this.setProps({
      error: this.isMatch() ? '' : 'Пароли не совпадают'
    })

  }

  init() {}


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
      Object.values(this.children).forEach(component => {
        if (component instanceof InputErrorMessage) {
          component.setProps({
            error: newProps.error
          });
        }
      });
    });
    return false;
  }

  render() {

    return `
      <main class="{{styles.signup}}">
        <form class="{{styles.form}}">
          <h1 class="{{styles.title}}">Регистрация</h1>
          <fieldset class="{{styles.inputs}}">
            {{{ AuthInput
              label="Почта"
              name="email"
              type="email"
              errorMessage="Данные не соответствуют формату email"
              value=formValues.email
              errors=errors.email
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Логин"
              name="login"
              type="text"
              errorMessage="Введите от 3 до 20 символов латиницей без пробелов и без спецсимволов"
              value=formValues.login
              errors=errors.login
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Имя"
              name="first_name"
              type="text"
              errorMessage="Введите имя. Первая буква должна быть заглавной, без пробелов, без цифр, без спецсимволов"
              value=formValues.first_name
              errors=errors.first_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Фамилия"
              name="second_name"
              type="text"
              errorMessage="Введите фамилию. Первая буква должна быть заглавной, без пробелов, без цифр, без спецсимволов"
              value=formValues.second_name
              errors=errors.second_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Телефон"
              name="phone"
              type="tel"
              errorMessage="Введите от 10 до 15 цифр, может начинаться с плюса"
              value=formValues.phone
              errors=errors.phone
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Пароль"
              name="password"
              type="password"
              errorMessage="Введите от 8 до 40 символов, обязательны хотя бы одна заглавная буква и цифра"
              value=formValues.password
              errors=errors.password
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Пароль (ещё раз)"
              name="passwordCheck"
              type="password"
              errorMessage="Введите от 8 до 40 символов, обязательны хотя бы одна заглавная буква и цифра"
              value=formValues.passwordCheck
              errors=errors.passwordCheck
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ InputErrorMessage
              error=error
            }}}
          </fieldset>
          {{{ AuthButton
            buttonText="Авторизоваться"
            isFormInvalid=isFormInvalid
            isButtonDisabled=isButtonDisabled
          }}}
          <p onclick="renderPage('signin')" class="{{styles.btn}}">Войти</p>
        </form>
      </main>
    `
  }
}

export default Signup;

