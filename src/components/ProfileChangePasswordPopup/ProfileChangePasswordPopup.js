import * as styles from './ProfileChangePasswordPopup.module.css';
import { Block } from '../../utils/Block.js';
import registerComponent from '../../utils/registerComponent.js';
import ProfileInput from '../../components/ProfileInput/ProfileInput.js';
import AuthButton from '../../components/AuthButton/AuthButton.js';
import Button from '../../components/Button/Button.js';
import InputErrorMessage from '../../components/InputErrorMessage/InputErrorMessage.js';

class ProfileChangePasswordPopup extends Block {

  constructor(props) {
    super({
      ...props,
      styles,
      isButtonDisabled: 'disabled',
      events: {
        submit: (e) => this.handleSubmit(e)
      }
     });
     this.props.state = () => this.props.passwordPopupIsOpened ? this.props.styles.popup_opened : '';
    }

  handlePopup(e) {
    e.stopPropagation();
    this.props.onClick(e);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, newPassword, passwordCheck } = this.props.formValues;
    console.log('SUBMIT POPUP', {
      oldPassword: password,
      newPassword: newPassword,
      passwordCheck: passwordCheck
    })
  }

  handleInputChange (event) {

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

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ProfileInput) {
        component.setProps({
          value: newProps.formValues[component.props.name],
          errors: newProps.errors[component.props.name],
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
      }}}
      </fieldset>
      {{{ InputErrorMessage error=error }}}

      {{{ AuthButton isButtonDisabled=isButtonDisabled buttonText="Сохранить" }}}
      {{{Button type="button" value="Назад" class=styles.btn onClick=onClick}}}
      </form>
    </div>
    `
  }
}

registerComponent('ProfileChangePasswordPopup', ProfileChangePasswordPopup);

export default ProfileChangePasswordPopup;
