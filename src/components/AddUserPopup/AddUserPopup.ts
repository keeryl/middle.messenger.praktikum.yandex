import { Block } from '../../utils/Block';
import * as styles from '../../components/AddUserPopup/AddUserPopup.module.css';
import registerComponent from '../../utils/registerComponent';
import Input from '../Input/Input';
import AuthButton from '../AuthButton/AuthButton';
import UserController from '../../controllers/UserController';
import ChatController from '../../controllers/ChatsController';
import DropdownList from '../DropdownList/DropdownList';

type Props = {
  [key: string]: unknown
}

class AddUserPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      users: [],
      inputValue: '',
      selectedUser: {id: null, login: ''},
      dropListStub: '',
      onInput: (e: Event) => this.handleInput(e),
      onDropItemClick: (id: number, login: string) => this.handleDropitemClick(id, login),
      events: {
        submit: (e: Event) => this.handleSubmit(e),
      }
    });
    this.props.state = () => this.props.addUserPopupIsOpened ? this.props.styles.popup_opened : '';
    this.props.buttonState = () => this.props.selectedUser.login ? '' : 'disabled' ;
  }

  handleInput(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.setProps({
      inputValue: value,
      selectedUser: {id: null, login: ''}
    });
    if (this.props.inputValue === '') {
      this.setProps({
        users: [],
        dropListStub: '',
      });
    } else {
      UserController.findUser(value)
      .then(res => {
        if ((res as []).length > 0) {
          this.setProps({
            users: res
          });
        } else {
          this.setProps({
            users: [],
            dropListStub: 'Не найдено',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  handleDropitemClick(id: number, login: string) {
    this.setProps({
      selectedUser: { login: login, id: id },
      users: [],
      dropListStub: '',
      inputValue: login,
    });
  }

  handleSubmit(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    ChatController.addUserToChat(this.props.selectedChatId, this.props.selectedUser.id)
      .then(() => {
        this.setProps({
          inputValue: '',
          selectedUser: {id: null, login: null}
        });
        ChatController.fetchChatUsers(this.props.selectedChatId)
          .then(res => {
            console.log('CHAT USERS', res);
          })
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: this.props.buttonState,
        });
      }
      if (component instanceof DropdownList) {
        component.setProps({
          list: newProps.users,
          stub: newProps.dropListStub
        });
      }
      if (component instanceof Input) {
        component.setProps({
          value: newProps.selectedUser.login,
        });
      }
    });
    if (oldProps.addUserPopupIsOpened === newProps.addUserPopupIsOpened) {
      return false;
    } else {
      this.setProps({
        selectedUser: {id: null, login: ''},
        users: [],
        dropListStub: '',
        inputValue: ''
      });
      return true;
    }
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}" id="popup-addUser">
      <form class="{{styles.popup-form}}">
        <h2 class="{{styles.title}}">Добавить пользователя</h2>
        <fieldset class="{{styles.fieldset}}">
          {{{ Input
            class=styles.input
            type="text"
            value=selectedUser.login
            onChange=onInput
            placeholder="Поиск"
          }}}
          {{{ DropdownList styles=styles list=users stub=dropListStub onClick=onDropItemClick}}}
        </fieldset>
        {{{ AuthButton
          buttonText="Добавить"
          isButtonDisabled=buttonState
        }}}
      </form>
    </div>
    `
  }
}

registerComponent('AddUserPopup', AddUserPopup);

export default AddUserPopup;
