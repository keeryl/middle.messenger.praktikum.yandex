import { Block } from '../../utils/Block';
import ProfileInput from '../../components/ProfileInput/ProfileInput';
import ProfileChangeDataBtn from '../../components/ProfileChangeDataBtn/ProfileChangeDataBtn';
import Button from '../../components/Button/Button';
import ProfileChangePasswordPopup from '../../components/ProfileChangePasswordPopup/ProfileChangePasswordPopup';
import ChangeAvatarPopup from '../../components/ChangeAvatarPopup/ChangeAvatarPopup';
import * as styles from './Profile.module.css';
import registerComponent from '../../utils/registerComponent';
import * as popup from '../../components/ProfileChangePasswordPopup/ProfileChangePasswordPopup.module.css';
import useInputValidation from '../../utils/inputValidator';
import AuthController from '../../controllers/AuthController';
import UserController from '../../controllers/UserController';
import Router from '../../utils/Router';
import { withStore } from '../../hocs/withStore';
import { isEqual } from '../../utils/helpers';
const [formValues, errors, validateInput, validateForm] = useInputValidation();
import Avatar from '../../components/Avatar/Avatar';
import ApiMessage from '../../components/ApiMessage/ApiMessage';
Button
popup

type Props = {
  [key: string]: unknown
}

class Profile extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      apiMessage: '',
      apiMessageClass: null,
      formValues: {...formValues},
      errors: {...errors},
      validateInput: validateInput,
      validateForm: validateForm,
      error: '',
      passwordPopupIsOpened: false,
      avatarPopupIsOpened: false,
      handlePasswordPopup: () => this.handlePasswordPopup(),
      onDataChange: (e: Event) => this.handleChangeData(e),
      onPasswordChange: () => this.handlePasswordChange(),
      handleLogout: () => this.handleLogout(),
      handleBackClick: () => this.handleBackClick(),
      onChange: (e: Event) => this.handleInputChange(e),
      onFocusout: (e: Event) => this.handleFocusout(e),
      onAvatarClick: () => this.handleAvatarPopup(),
      isButtonDisabled: 'disabled',
      events: {
        reset: () => this.handleLogout(),
      }
    });
  }

  checkFormValidity () {
    const isEmailInvalid = Object.values(this.props.errors.email).some(v => v === false);
    const isLoginInvalid = Object.values(this.props.errors.login).some(v => v === false);
    const isFirstNameInValid = Object.values(this.props.errors.first_name).some(v => v === false);
    const isSecondNameInvalid = Object.values(this.props.errors.second_name).some(v => v === false);
    const isPhoneInvalid = Object.values(this.props.errors.phone).some(v => v === false);
    const isDisplayNameInvalid = Object.values(this.props.errors.display_name).some(v => v === false);
    const isUserDataNotDifferent =
      this.props.user.email === this.props.formValues.email &&
      this.props.user.login === this.props.formValues.login &&
      this.props.user.first_name === this.props.formValues.first_name &&
      this.props.user.second_name === this.props.formValues.second_name &&
      this.props.user.display_name === this.props.formValues.display_name &&
      this.props.user.phone === this.props.formValues.phone;
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
    const samePasswordError = this.props.formValues.password === this.props.formValues.newPassword ? 'Новый пароль совпадает с предыдущим.' : '';
    const passwordMatchError = this.props.formValues.newPassword !== this.props.formValues.passwordCheck ? 'Пароли не совпадают' : '';
    return `${samePasswordError} ${passwordMatchError}`
  }

  handleChangeData (e: Event) {
    const { email, login, first_name, second_name, display_name, phone } = this.props.formValues;
    UserController.changeUserProfileData({
      first_name: first_name,
      second_name: second_name,
      display_name: display_name,
      login: login,
      email: email,
      phone: phone
    })
      .then((data) => {
        if (data) {
          this.setProps({
            apiMessageClass: this.props.styles.successMessage,
            apiMessage: 'Данные профиля изменены',
            user: {
              ...this.props.user,
              display_name: this.props.user.display_name === null ? this.props.user.first_name : this.props.user.display_name,
            },
            formValues: {
              ...this.props.formValues,
              email: this.props.user.email,
              login: this.props.user.login,
              first_name: this.props.user.first_name,
              second_name: this.props.user.second_name,
              display_name: this.props.user.display_name ? this.props.user.display_name : this.props.user.first_name,
              phone: this.props.user.phone,
            },
            isButtonDisabled: this.checkFormValidity() ? '' : 'disabled',
          });
        }
      })
      .catch((e) => {
       let error
       if (e.reason === 'Email already exists') {
        error = 'Введеный email уже существует';
       } else if (e.reason === 'Login already exists') {
        error = 'Введеный login уже существует';
       } else {
         error = 'Произошла ошибка при изменении данных профиля';
       }
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

  handlePasswordChange() {
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

  handleAvatarPopup () {
    this.setProps({
      avatarPopupIsOpened: !this.props.avatarPopupIsOpened,
      isButtonDisabled: 'disabled',
      user: {
        ...this.props.user,
        display_name: this.props.user.display_name === null ? this.props.user.first_name : this.props.user.display_name,
      },
      formValues: {
        ...this.props.formValues,
        email: this.props.user.email,
        login: this.props.user.login,
        first_name: this.props.user.first_name,
        second_name: this.props.user.second_name,
        display_name: this.props.user.display_name ? this.props.user.display_name : this.props.user.first_name,
        phone: this.props.user.phone,
      },
    });
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
    AuthController.logout();
  }

  handleBackClick() {
    Router.go('/');
  }

  handleFocusout(event: Event) {
  }

  handleInputChange(event: Event) {
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
      isButtonDisabled: this.checkFormValidity() ? '' : 'disabled',
      error: this.getPasswordValidityError(),
    });
  }

  init() {

    this.setProps({
      user: {
        ...this.props.user,
        display_name: this.props.user.display_name === null ? this.props.user.first_name : this.props.user.display_name,
      },
      formValues: {
        ...this.props.formValues,
        email: this.props.user.email,
        login: this.props.user.login,
        first_name: this.props.user.first_name,
        second_name: this.props.user.second_name,
        display_name: this.props.user.display_name ? this.props.user.display_name : this.props.user.first_name,
        phone: this.props.user.phone,
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
        }
      }
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ProfileInput) {
        component.setProps({
          value: newProps.user[component.props.name],
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
      if (component instanceof ChangeAvatarPopup) {
        component.setProps({
          avatarPopupIsOpened: newProps.avatarPopupIsOpened
        });
      }
      if (component instanceof Avatar) {
        component.setProps({
          avatar: newProps.user.avatar
        });
      }
      if (component instanceof ApiMessage) {
        component.setProps({
          class: newProps.apiMessageClass,
          message: newProps.apiMessage
        });
      }
    });

    if (isEqual(oldProps.user, newProps.user)) {
      return false;
    } else if (oldProps.user.avatar !== newProps.user.avatar) {
      return false;
    } else {
      return true;
    }

  }

  render() {
    return `
      <main class="{{styles.profile-window}}">
      {{{ Button value='' class=styles.back-btn type="button" onClick=handleBackClick }}}
      <section class="{{styles.profile}}">
        <form class="{{styles.form}}">
          {{{ Avatar avatar=user.avatar onAvatarClick=onAvatarClick }}}
          <h1 class="{{styles.user-name}}">{{user.first_name}}</h1>
          <fieldset class="{{styles.user-info}}">
            {{{ ProfileInput
              label="Почта"
              name="email"
              type="email"
              errorMessage="Данные не соответствуют формату email"
              value=user.email
              errors=errors.email
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Логин"
              name="login"
              type="text"
              errorMessage="Введите от 3 до 20 символов латиницей без пробелов и без спецсимволов"
              value=user.login
              errors=errors.login
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Имя"
              name="first_name"
              type="text"
              errorMessage="Введите имя. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=user.first_name
              errors=errors.first_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Фамилия"
              name="second_name"
              type="text"
              errorMessage="Введите фамилию. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=user.second_name
              errors=errors.second_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Имя в чате"
              name="display_name"
              type="text"
              errorMessage="Введите имя в чате. Первая буква заглавная, без пробелов, без цифр, без спецсимволов"
              value=user.display_name
              errors=errors.display_name
              onFocusout=onFocusout
              onChange=onChange
            }}}
            {{{ ProfileInput
              label="Телефон"
              name="phone"
              type="tel"
              errorMessage="Введите от 10 до 15 цифр, может начинаться с плюса"
              value=user.phone
              errors=errors.phone
              onFocusout=onFocusout
              onChange=onChange
            }}}
          </fieldset>
          {{{ ApiMessage class=apiMessageClass message=apiMessage }}}

          {{{
            ProfileChangeDataBtn
              onDataChange=onDataChange
              isButtonDisabled=isButtonDisabled
              type="button"
          }}}
          {{{ Button value='Изменить пароль' class=styles.btn type="button" onClick=handlePasswordPopup}}}
          {{{ Button value='Выйти' class=styles.btn type="button" onClick=handleLogout}}}
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
            onPasswordChange=onPasswordChange
      }}}
      {{{ ChangeAvatarPopup
        avatarPopupIsOpened=avatarPopupIsOpened
        onClick=onAvatarClick
      }}}
      </main>
    `
  }
}

registerComponent('Profile', Profile);

const mapStateToProfileProps = (state: any) => ({ user: { ...(state.user || {} )} });

export const ProfilePage = withStore(mapStateToProfileProps)(Profile);
