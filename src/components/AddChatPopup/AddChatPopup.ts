import { Block } from '../../utils/Block';
import * as styles from '../../components/AddChatPopup/AddChatPopup.module.css';
import registerComponent from '../../utils/registerComponent';
import AuthInput from '../AuthInput/AuthInput';
import AuthButton from '../AuthButton/AuthButton';
import ChatsController from '../../controllers/ChatsController';
import ApiMessage from '../ApiMessage/ApiMessage';

type Props = {
  [key: string]: unknown
}

class AddChatPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      apiMessage: '',
      apiMessageClass: null,
      events: {
        submit: (e: Event) => this.handleSubmit(e),
      }
    });
    this.props.state = () => this.props.addChatPopupIsOpened ? this.props.styles.popup_opened : '';
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    console.log('SUBMIT ADD')
    ChatsController.create(this.props.formValues.chatTitle)
      .then(res => {
        if (res) {
          console.log('RES', res)
          ChatsController.fetchChats();
          this.setProps({
            apiMessageClass: this.props.styles.successMessage,
            apiMessage: 'Чат добавлен',
          });
          setTimeout(() => {
            this.props.closeAllPopups();
          }, 1500);
        }
      })
      .catch(err => {
        this.setProps({
          apiMessageClass: this.props.styles.errorMessage,
          apiMessage: 'Произошла ошибка при добавлении чата'
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setProps({
            apiMessageClass: null,
            apiMessage: ''
          });
        }, 1000);
      });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof AuthInput) {
        component.setProps({
          value: newProps.formValues.chatTitle,
          errors: newProps.errors.chatTitle,
        });
      }
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: newProps.isPopupBtnDisabled,
        });
      }
      if (component instanceof ApiMessage) {
        component.setProps({
          class: newProps.apiMessageClass,
          message: newProps.apiMessage
        });
      }
    });
    if (oldProps.addChatPopupIsOpened === newProps.addChatPopupIsOpened) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}" id="popup-addChat">
      <form class="{{styles.popup-form}}">
        <h2 class="{{styles.title}}">Добавить чат</h2>
        {{{ AuthInput
          label="Название чата"
          name="chatTitle"
          type="text"
          errorMessage="Название чата не введено или не соответствует формату"
          value=formValues.chatTitle
          errors=errors.chatTitle
          onFocusout=onPopupFocusout
          onChange=onPopupInput
        }}}
        {{{ ApiMessage class=apiMessageClass message=apiMessage }}}
        {{{ AuthButton
          buttonText="Добавить"
          isButtonDisabled=isPopupBtnDisabled
        }}}
      </form>
    </div>
    `
  }
}

registerComponent('AddChatPopup', AddChatPopup);

export default AddChatPopup;
