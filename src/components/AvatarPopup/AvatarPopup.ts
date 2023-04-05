import { Block } from '../../utils/Block';
import * as styles from '../../components/AvatarPopup/AvatarPopup.module.css';
import registerComponent from '../../utils/registerComponent';
import AuthButton from '../AuthButton/AuthButton';
import ChatsController from '../../controllers/ChatsController';
import ApiMessage from '../ApiMessage/ApiMessage';

type Props = {
  [key: string]: unknown
}

class AvatarPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      isButtonDisabled: 'disabled',
      apiMessage: '',
      apiMessageClass: null,
      file: null,
      events: {
        submit: (e: Event) => this.handleSubmit(e),
        input: (e: Event) => this.handleInput(e)
      }
    });
    this.props.state = () => this.props.avatarPopupIsOpened ? this.props.styles.popupOpened : '';
  }

  handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    const file = target['files']![0]
    this.setProps({
      file: file,
    });
    this.setProps({
      isButtonDisabled: this.checkFormValidity() ? '' : 'disabled'
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.setProps({
      isButtonDisabled: 'disabled',
    });
    let formData = new FormData();
    formData.append('avatar', this.props.file);
    formData.append('chatId', this.props.selectedChatId);
    ChatsController.editAvatar(formData)
      .then((data) => {
        if (data) {
          this.setProps({
            apiMessageClass: this.props.styles.successMessage,
            apiMessage: 'Аватар изменен',
            file: null
          });
          ChatsController.fetchChats();
          setTimeout(() => {
            this.props.closeAllPopups();
          }, 2000);
        }
      })
      .catch(() => {
        this.setProps({
          apiMessageClass: this.props.styles.errorMessage,
          apiMessage: 'Произошла ошибка при изменении аватара',
          file: null
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.setProps({
            apiMessageClass: null,
            apiMessage: ''
          });
        }, 2000);
    });
  }

  checkFormValidity() {
    return this.props.file;
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: newProps.isButtonDisabled
        });
      }
      if (component instanceof ApiMessage) {
        component.setProps({
          class: newProps.apiMessageClass,
          message: newProps.apiMessage
        });
      }
    });

    if (oldProps.avatarPopupIsOpened === newProps.avatarPopupIsOpened) {
      return false;
    }
    return true;
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}" id="popup-avatar">
      <form class="{{styles.popupForm}}">
        <h2 class="{{styles.title}}">Изменить аватар</h2>
        <fieldset class="{{styles.fieldset}}">
        <div class="{{styles.inputContainer}}">
          <input class="{{styles.input}}" type="file" name="avatar" id="avatar"/>
          <label class="{{styles.inputLabel}}" for="avatar">Выбрать файл на компьютере</label>
        </div>
        </fieldset>
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

registerComponent('AvatarPopup', AvatarPopup);

export default AvatarPopup;
