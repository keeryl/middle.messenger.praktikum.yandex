import { Block } from '../../utils/Block.js';
import ProfileInput from '../../components/ProfileInput/ProfileInput.js';
import ProfileChangeDataBtn from '../../components/ProfileChangeDataBtn/ProfileChangeDataBtn.js';
import Button from '../../components/Button/Button.js';
import ProfileChangePasswordPopup from '../../components/ProfileChangePasswordPopup/ProfileChangePasswordPopup.js';
import * as styles from './Profile.module.css';
import registerComponent from '../../utils/registerComponent.js';

import * as popup from '../../components/ProfileChangePasswordPopup/ProfileChangePasswordPopup.module.css';


class Profile extends Block {
  constructor(props) {
    super({
      styles,
      ...props,
      currentUser: {
        email: '2309696@mail.ru',
        login: 'keeryl',
        first_name: 'Кирилл',
        second_name: 'Зикевский',
        display_name: 'Кирилл',
        phone: '89262309696',
      },
      error: '',
      passwordPopupIsOpened: false,
      handlePasswordPopup: () => this.handlePasswordPopup(),
      onDataChange: () => this.handleChangeData(),
      onChange: (e) => this.handleInputChange(e),
      onFocusout: (e) => this.handleFocusout(e),
      isButtonDisabled: 'disabled',
      events: {
        reset: () => this.handleLogout()
      }
    });
    // this.props.error = () => (this.props.formValues.newPassword !== this.props.formValues.passwordCheck) ? 'Пароли не совпадают' : '';
    // this.props.samePasswordError = () => (this.props.formValues.password !== this.props.formValues.newPassword) ? '' : 'Новый пароль совпадает с предыдущим';
  }

  checkFormValidity () {
    const isEmailInvalid = Object.values(this.props.errors.email).some(v => v === false);
    const isLoginInvalid = Object.values(this.props.errors.login).some(v => v === false);
    const isFirstNameInValid = Object.values(this.props.errors.first_name).some(v => v === false);
    const isSecondNameInvalid = Object.values(this.props.errors.second_name).some(v => v === false);
    const isPhoneInvalid = Object.values(this.props.errors.phone).some(v => v === false);
    const isDisplayNameInvalid = Object.values(this.props.errors.display_name).some(v => v === false);
    const isUserDataNotDifferent =
      this.props.currentUser.email === this.props.formValues.email &&
      this.props.currentUser.login === this.props.formValues.login &&
      this.props.currentUser.first_name === this.props.formValues.first_name &&
      this.props.currentUser.second_name === this.props.formValues.second_name &&
      this.props.currentUser.display_name === this.props.formValues.display_name &&
      this.props.currentUser.phone === this.props.formValues.phone;
    const isFormInvalid =
      isEmailInvalid ||
      isLoginInvalid ||
      isFirstNameInValid ||
      isSecondNameInvalid ||
      isPhoneInvalid ||
      isDisplayNameInvalid;
    return !isUserDataNotDifferent && !isFormInvalid
  }

  getPasswordValidityError () {
    const samePasswordError = this.props.formValues.password === this.props.formValues.newPassword ? 'Новый пароль не введен или совпадает с предыдущим.' : '';
    const passwordMatchError = this.props.formValues.newPassword !== this.props.formValues.passwordCheck ? 'Пароли не совпадают' : '';
    return `${samePasswordError} ${passwordMatchError}`
  }

  handleChangeData () {
    const { email, login, first_name, second_name, display_name, phone } = this.props.formValues;
    console.log('SUBMIT',
      { email: email,
        login: login,
        first_name: first_name,
        second_name: second_name,
        display_name: display_name,
        phone: phone
      }
    )
  }

  handlePasswordPopup () {
    this.setProps({
      passwordPopupIsOpened: !this.props.passwordPopupIsOpened
    });
    this.setProps({
      formValues: {
        ...this.props.formValues,
        password: '',
        passwordCheck: '',
        newPassword: ''
      },
      errors: {
        ...this.props.errors,
        password: { required: false, format: false },
        passwordCheck: { required: false, format: false },
        newPassword: { required: false, format: false },
      },
      error: ''
    });
  }

  handleLogout() {
    console.log('LOGOUT');
  }

  handleFocusout(event) {
    const { name, value } = event.target;
    this.setProps({
      isButtonDisabled: this.checkFormValidity() ? '' : 'disabled',
      error: this.getPasswordValidityError(),
    });
  }

  handleInputChange(event) {
    const { name, value } = event.target;
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
      isButtonDisabled: this.checkFormValidity() ? '' : 'disabled',
      error: this.getPasswordValidityError(),
    });
  }

  init() {
    this.setProps({
      formValues: {
        ...this.props.formValues,
        email: this.props.currentUser.email,
        login: this.props.currentUser.login,
        first_name: this.props.currentUser.first_name,
        second_name: this.props.currentUser.second_name,
        display_name: this.props.currentUser.display_name,
        phone: this.props.currentUser.phone,
      },
      errors: {
        ...this.props.errors,
        email: {
          required: true,
          format: true,
        },
        login: {
          required: true,
          format: true,
        },
        first_name: {
          required: true,
          format: true,
        },
        second_name: {
          required: true,
          format: true,
        },
        display_name: {
          required: true,
          format: true
        },
        phone: {
          required: true,
          format: true,
        },
        // password: {
        //   required: true,
        //   format: true,
        // },
        // newPassword: {
        //   required: true,
        //   format: true
        // },
        // passwordCheck: {
        //   required: true,
        //   format: true,
        // }
      }
    });
  }

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ProfileInput) {
        component.setProps({
          value: newProps.formValues[component.props.name],
          errors: newProps.errors[component.props.name],
        });
      }
      if (component instanceof ProfileChangeDataBtn) {
        component.setProps({
          isButtonDisabled: newProps.isButtonDisabled,
        });
      }
      if (component instanceof ProfileChangePasswordPopup) {
        component.setProps({
          passwordPopupIsOpened: newProps.passwordPopupIsOpened,
          formValues: newProps.formValues,
          errors: newProps.errors,
          error: newProps.error,
        });
      }
    });
    return false;
  }

  render() {

    return `
      <main class="{{styles.profile-window}}">
      <button onclick="renderPage('chat')" class="{{styles.back-btn}}">
        <div class="{{styles.arrow}}"></div>
      </button>
      <section class="{{styles.profile}}">
        <form class="{{styles.form}}">
          <div class="{{styles.user-img}}"></div>
          <h1 class="{{styles.user-name}}">Кирилл</h1>
          <fieldset class="{{styles.user-info}}">
            {{{ ProfileInput
              label="Почта"
              name="email"
              type="email"
              errorMessage="Данные не соответствуют формату email"
              value=formValues.email
              errors=errors.email
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Логин"
              name="login"
              type="text"
              errorMessage="Введите от 3 до 20 символов латиницей без пробелов и без спецсимволов"
              value=formValues.login
              errors=errors.login
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Имя"
              name="first_name"
              type="text"
              errorMessage="Введите имя. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=formValues.first_name
              errors=errors.first_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Фамилия"
              name="second_name"
              type="text"
              errorMessage="Введите фамилию. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=formValues.second_name
              errors=errors.second_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Имя в чате"
              name="display_name"
              type="text"
              errorMessage="Введите имя в чате. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=formValues.display_name
              errors=errors.display_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Телефон"
              name="phone"
              type="tel"
              errorMessage="Введите от 10 до 15 цифр, может начинаться с плюса"
              value=formValues.phone
              errors=errors.phone
              onFocusout=onFocusout
              onChange=onChange
            }}}
          </fieldset>
          {{{
            ProfileChangeDataBtn
              onDataChange=onDataChange
              isButtonDisabled=isButtonDisabled
          }}}
          {{{ Button value='Изменить пароль' class=styles.btn type="button" onClick=handlePasswordPopup}}}
          <button class="{{styles.btn}}" type="reset">Выйти</button>
        </form>
      </section>
      {{{ ProfileChangePasswordPopup
            passwordPopupIsOpened=passwordPopupIsOpened
            onClick=handlePasswordPopup
            errors=errors
            formValues=formValues
            onChange=onChange
            onFocusout=onFocusout
            error=error
      }}}
      </main>
    `
  }
}

registerComponent('Profile', Profile);


export default Profile;
