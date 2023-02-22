import { Block } from '../../utils/Block';
import AuthButton from '../../components/AuthButton/AuthButton';
import AuthInput from '../../components/AuthInput/AuthInput';
import InputErrorMessage from '../../components/InputErrorMessage/InputErrorMessage';
import * as styles from './signup.module.css';
import Router from '../../utils/Router';
import useInputValidation from '../../utils/inputValidator';
const [formValues, errors, validateInput, validateForm] = useInputValidation();
import AuthController from '../../controllers/AuthController';
import ApiMessage from '../../components/ApiMessage/ApiMessage';

type Props = {
  [key: string]: unknown
}

class Signup extends Block {
  isMatch: Function
  constructor(props: Props) {
    super({
      ...props,
      error: '',
      apiMessage: '',
      apiMessageClass: null,
      formValues: formValues,
      errors: errors,
      validateInput: validateInput,
      validateForm: validateForm,
      styles,
      isEmailInvalid: (): boolean => Object.values(this.props.errors.email).some(v => v === false),
      isLoginInvalid: (): boolean => Object.values(this.props.errors.login).some(v => v === false),
      isFirstNameInValid: (): boolean => Object.values(this.props.errors.first_name).some(v => v === false),
      isSecondNameInvalid: (): boolean => Object.values(this.props.errors.second_name).some(v => v === false),
      isPhoneInvalid: (): boolean => Object.values(this.props.errors.phone).some(v => v === false),
      isPasswordInvalid: (): boolean => Object.values(this.props.errors.password).some(v => v === false),
      isPasswordCheckInvalid: (): boolean => Object.values(this.props.errors.passwordCheck).some(v => v === false),
      isFormInvalid: (): boolean =>
        this.props.isEmailInvalid() ||
        this.props.isLoginInvalid() ||
        this.props.isFirstNameInValid() ||
        this.props.isSecondNameInvalid() ||
        this.props.isPhoneInvalid() ||
        this.props.isPasswordInvalid() ||
        this.props.isPasswordCheckInvalid(),
      isButtonDisabled: 'disabled',
      onFocusout: () => this.handleFocusout(),
      onChange: (e: Event) => this.handleChange(e),
      onSigninClick: () => this.onSigninClick(),
      events: {
        submit: (e: Event) => this.handleSubmit(e)
      },
    });
    this.isMatch = () => this.checkPassword()
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.setProps({
      isButtonDisabled: 'disabled'
    });
    const { first_name, second_name, login, email, password, phone } = this.props.formValues;
    AuthController.signup({
      first_name: first_name,
      second_name: second_name,
      login: login,
      email: email,
      password: password,
      phone: phone,
    })
      .then((data) => {
        if (data) {
          this.setProps({
            apiMessageClass: this.props.styles.successMessage,
            apiMessage: 'Регистрация прошла упешно',
          });
          setTimeout(() => {
            AuthController.fetchUser();
            Router.go('/')
          }, 1000);
        }
      })
      .catch((e) => {
       let error
       if (e.reason === 'Email already exists') {
        error = 'Введеный email уже существует';
       } else if (e.reason === 'Login already exists') {
        error = 'Введеный login уже существует';
       } else {
         error = 'Произошла ошибка при регистрации';
       }
        this.setProps({
          isButtonDisabled: ''
        });
        this.setProps({
          apiMessageClass: this.props.styles.errorMessage,
          apiMessage: error,
          isButtonDisabled: '',
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setProps({
            apiMessageClass: null,
            apiMessage: ''
          });
        }, 3000);
      });
  }

  checkPassword() {
    return this.props.formValues.password === this.props.formValues.passwordCheck
  }

  handleFocusout() {
    this.setProps({
      error: this.isMatch() ? '' : 'Пароли не совпадают'
    })
  }

  onSigninClick() {
    Router.go('/signin')
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
      isButtonDisabled: !this.props.isFormInvalid() && this.isMatch() ? '' : 'disabled',
    })

    this.setProps({
      error: this.isMatch() ? '' : 'Пароли не совпадают'
    })

  }

  init() {}


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
      if (component instanceof InputErrorMessage) {
        component.setProps({
          error: newProps.error
        });
      }
      if (component instanceof ApiMessage) {
        component.setProps({
          class: newProps.apiMessageClass,
          message: newProps.apiMessage
        });
      }
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
              errorMessage="Введите имя. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=formValues.first_name
              errors=errors.first_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ AuthInput
              label="Фамилия"
              name="second_name"
              type="text"
              errorMessage="Введите фамилию. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
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
          {{{ ApiMessage class=apiMessageClass message=apiMessage }}}
          {{{ AuthButton
            buttonText="Зарегистрироваться"
            isFormInvalid=isFormInvalid
            isButtonDisabled=isButtonDisabled
          }}}
          {{{ Button
            type="button"
            value="Войти"
            class=styles.button
            onClick=onSigninClick
          }}}
        </form>
      </main>
    `
  }
}

export default Signup;
