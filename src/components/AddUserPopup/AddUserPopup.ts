import { Block } from '../../utils/Block';
import * as styles from '../../components/AddUserPopup/AddUserPopup.module.css';
import registerComponent from '../../utils/registerComponent';
import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';

type Props = {
  [key: string]: unknown
}

class AddUserPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      events: {
        submit: (e: Event) => this.handleSubmit(e),
      }
    });
    this.props.state = () => this.props.addUserPopupIsOpened ? this.props.styles.popup_opened : '';
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log('SUBMIT ADD')
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof AuthInput) {
        component.setProps({
          value: newProps.formValues.login,
          errors: newProps.errors.login,
        });
      }
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: newProps.isPopupBtnDisabled,
        });
      }
    });
    if (oldProps.addUserPopupIsOpened === newProps.addUserPopupIsOpened) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}" id="popup-addUser">
      <form class="{{styles.popup-form}}">
        <h2 class="{{styles.title}}">Добавить пользователя</h2>
        {{{ AuthInput
          label="Логин"
          name="login"
          type="text"
          errorMessage="Логин не введен или не соответствует формату"
          value=formValues.login
          errors=errors.login
          onFocusout=onPopupFocusout
          onChange=onPopupInput
        }}}
        {{{ AuthButton
          buttonText="Добавить"
          isButtonDisabled=isPopupBtnDisabled
        }}}
      </form>
    </div>
    `
  }
}

registerComponent('AddUserPopup', AddUserPopup);

export default AddUserPopup;
