import * as styles from './ProfileChangePasswordPopup.module.css';
import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';
import ProfileInput from '../ProfileInput/ProfileInput';
import AuthButton from '../AuthButton/AuthButton';
import Button from '../Button/Button';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import UserController from '../../controllers/UserController';
import ApiMessage from '../ApiMessage/ApiMessage';
Button

type Props = {
  [key: string]: unknown
}

class ProfileChangePasswordPopup extends Block {

  constructor(props: Props) {
    super({
      ...props,
      styles,
      isButtonDisabled: 'disabled',
      apiMessage: '',
      apiMessageClass: null,
      events: {
        submit: (e: Event) => this.handleSubmit(e)
      }
     });
     this.props.state = () => this.props.passwordPopupIsOpened ? this.props.styles.popup_opened : '';
    }

  handlePopup(e: Event) {
    e.stopPropagation();
    this.props.onClick(e);
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    const { password, newPassword } = this.props.formValues;
    UserController.changeUserPassword({
      oldPassword: password,
      newPassword: newPassword
    })
      .then(() => {
        console.log('Успешно');
        this.setProps({
          apiMessageClass: this.props.styles.successMessage,
          apiMessage: 'Пароль изменен',
        });
        this.props.onPasswordChange();
      })
      .catch(e => {
        console.log('error', e)
        this.setProps({
          apiMessageClass: this.props.styles.errorMessage,
          apiMessage: 'Произошла ошибка при изменении пароля или введен неправильный пароль'
        });
        this.props.onPasswordChange();
      })
      .finally(() => {
        setTimeout(() => {
          this.setProps({
            apiMessageClass: null,
            apiMessage: ''
          });
        }, 3000)
      });
  }

  checkFormValidity () {
    const isPasswordInvalid = Object.values(this.props.errors.password).some(v => v === false);
    const isPaswordCheckInvalid = Object.values(this.props.errors.passwordCheck).some(v => v === false);
    const isNewPasswordInvalid = Object.values(this.props.errors.newPassword).some(v => v === false);
    const isPasswordNotDifferent = this.props.formValues.newPassword !== this.props.formValues.passwordCheck;
    const isPasswordSame = this.props.formValues.newPassword !== this.props.formValues.password;
    const isFormInvalid = isPasswordInvalid || isPaswordCheckInvalid || isNewPasswordInvalid || !isPasswordSame;
    return !isPasswordNotDifferent && !isFormInvalid;
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ProfileInput) {
        component.setProps({
          value: newProps.formValues[component.props.name],
          errors: newProps.errors[component.props.name],
          apiMessage: newProps.apiMessage
        });
      }
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: this.checkFormValidity() ? '' : 'disabled'
        });
      }
      if (component instanceof InputErrorMessage) {
        component.setProps({
          error: newProps.error,
        });
      }
      if (component instanceof ApiMessage) {
        component.setProps({
          class: newProps.apiMessageClass,
          message: newProps.apiMessage
        });
      }
    });


    if (oldProps.passwordPopupIsOpened === newProps.passwordPopupIsOpened) {
      return false;
    }


    return true;
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}">
      <form class="{{styles.form}}">
      <fieldset class="{{styles.fieldset}}">
      {{{ ProfileInput
        label="Старый пароль"
        name="password"
        type="password"
        errorMessage="Введите от 8 до 40 символов, обязательны хотя бы одна заглавная буква и цифра"
        value=formValues.password
        errors=errors.password
        onFocusout=onFocusout
        onChange=onChange
        apiMessage=apiMessage
      }}}
      {{{ ProfileInput
        label="Новый пароль"
        name="newPassword"
        type="password"
        errorMessage="Введите от 8 до 40 символов, обязательны хотя бы одна заглавная буква и цифра"
        value=formValues.newPassword
        errors=errors.newPassword
        onFocusout=onFocusout
        onChange=onChange
        apiMessage=apiMessage
      }}}
      {{{ ProfileInput
        label="Повторите новый пароль"
        name="passwordCheck"
        type="password"
        errorMessage="Введите от 8 до 40 символов, обязательны хотя бы одна заглавная буква и цифра"
        value=formValues.passwordCheck
        errors=errors.passwordCheck
        onFocusout=onFocusout
        onChange=onChange
        apiMessage=apiMessage
      }}}
      </fieldset>
      {{{ InputErrorMessage error=error }}}
      {{{ ApiMessage class=apiMessageClass message=apiMessage }}}
      {{{ AuthButton isButtonDisabled=isButtonDisabled buttonText="Сохранить" }}}
      {{{ Button type="button" value="Назад" class=styles.btn onClick=onClick }}}
      </form>
    </div>
    `
  }
}

registerComponent('ProfileChangePasswordPopup', ProfileChangePasswordPopup);

export default ProfileChangePasswordPopup;
