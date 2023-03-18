import { Block } from '../../utils/Block';
import * as styles from '../../components/DeleteUserPopup/DeleteUserPopup.module.css';
import registerComponent from '../../utils/registerComponent';
import ChatController from '../../controllers/ChatsController';
import DropdownList from '../DropdownList/DropdownList';

type Props = {
  [key: string]: unknown
}

class DeleteUserPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      users: [],
      handleDeleteUser: (id: number, login: string) => this.handleDeleteUser(id, login)
    });
    this.props.state = () => this.props.deleteUserPopupIsOpened ? this.props.styles.popup_opened : '';
  }

  handleDeleteUser(id: number, login: string) {
    ChatController.deleteUserFromChat(this.props.selectedChatId, id)
      .then(() => {
        return ChatController.fetchChatUsers(this.props.selectedChatId);
      })
      .then((res) => {
        if (res) {
          this.setProps({
            users: res
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof DropdownList) {
        component.setProps({
          list: newProps.users,
        });
      }
    });
    if (oldProps.deleteUserPopupIsOpened === newProps.deleteUserPopupIsOpened ) {
      return false;
    } else {
      ChatController.fetchChatUsers(this.props.selectedChatId)
      .then(res => {
        this.setProps({
          users: res
        });
      });
      return true;
    }
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}" id="popup-deleteUser">
      <form class="{{styles.popup-form}}">
        <h2 class="{{styles.title}}">Удалить пользователя</h2>
        <fieldset class="{{styles.fieldset}}">
          {{{ DropdownList styles=styles list=users stub="Нет пользователей" onClick=handleDeleteUser}}}
        </fieldset>
      </form>
    </div>
    `
  }
}

registerComponent('DeleteUserPopup', DeleteUserPopup);

export default DeleteUserPopup;

