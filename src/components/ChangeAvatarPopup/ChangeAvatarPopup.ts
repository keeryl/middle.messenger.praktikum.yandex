import * as styles from './ChangeAvatarPopup.module.css';
import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';
import Button from '../Button/Button';
import UserController from '../../controllers/UserController';
import ApiMessage from '../ApiMessage/ApiMessage';
import AuthButton from '../AuthButton/AuthButton';
Button

type Props = {
  [key: string]: unknown
}

class ChangeAvatarPopup extends Block {

  constructor(props: Props) {
    super({
      ...props,
      styles,
      isButtonDisabled: 'disabled',
      apiMessage: '',
      apiMessageClass: null,
      file: null,
      events: {
        submit: (e: Event) => this.handleSubmit(e),
        input: (e: Event) => this.handleInput(e)
      }
     });
     this.props.state = () => this.props.avatarPopupIsOpened ? this.props.styles.popup_opened : '';
    }

  handlePopup(e: Event) {
    e.stopPropagation();
    this.props.onClick(e);
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
    formData.append('avatar', this.props.file)
    UserController.changeUserAvatar(formData)
      .then((data) => {
        if (data) {
          this.setProps({
            apiMessageClass: this.props.styles.successMessage,
            apiMessage: 'Аватар изменен',
            file: null
          });
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
    <div class="{{styles.popup}} {{state}}">
      <form class="{{styles.form}}">
      <h2 class="{{styles.title}}">Загрузите файл</h2>
      <fieldset class="{{styles.fieldset}}">
      <div class="{{styles.input-container}}">
        <input class="{{styles.input}}" type="file" name="avatar" id="avatar"/>
        <label class="{{styles.input-label}}" for="avatar">Выбрать файл на компьютере</label>
      </div>
      </fieldset>
      {{{ ApiMessage class=apiMessageClass message=apiMessage }}}
      {{{ AuthButton isButtonDisabled=isButtonDisabled buttonText="Поменять" }}}
      {{{ Button type="button" value="Назад" class=styles.btn onClick=onClick }}}
      </form>
    </div>
    `
  }
}

registerComponent('ChangeAvatarPopup', ChangeAvatarPopup);

export default ChangeAvatarPopup;
