import { Block } from '../../utils/Block';
import * as styles from './ChatListMenu.module.css';
import registerComponent from '../../utils/registerComponent';
import Router from '../../utils/Router';
import SearchInput from '../SearchInput/SearchInput';
import DropdownList from '../DropdownList/DropdownList';
import UserController from '../../controllers/UserController';
import ChatController from '../../controllers/ChatsController'
SearchInput

type Props = {
  [key: string]: unknown
}

class ChatListMenu extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
      selectedUser: {id: null, login: ''},
      users: [],
      dropListStub: '',
      inputValue: '',
      onInput: (e: Event) => this.handleInput(e),
      handleProfileClick: () => this.handleProfileClick(),
      onDropItemClick: (id: number, login: string) => this.handleDropitemClick(id, login),
    });
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
    ChatController.create(login)
      .then(res => {
        if (res) {
          ChatController.addUserToChat((res as Record<string, number>).id, id)
            .then(() => {
              ChatController.fetchChats();
              this.setProps({
                users: [],
                dropListStub: '',
                inputValue: '',
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleProfileClick() {
    Router.go('/profile');
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof DropdownList) {
        component.setProps({
          list: newProps.users,
          stub: newProps.dropListStub
        });
      }
      if (component instanceof SearchInput) {
        component.setProps({
          value: newProps.inputValue
        });
      }
    });
    if (oldProps.chatListSettingsActive === newProps.chatListSettingsActive) {
      return false;
    } else {
      return true;
    }
  }

  render(): string {
    return `
      <section class="{{styles.chatListMenu}}">
        <nav class="{{styles.nav}}">
          {{{ Button
            type="button"
            class=styles.settings
            value=""
            onClick=onChatListSettingsClick
          }}}
          {{{ Button
            value="Профиль >"
            class=styles.navButton
            type="button"
            onClick=handleProfileClick
          }}}
        </nav>
        <fieldset class="{{styles.fieldset}}">
          {{{ SearchInput onChange=onInput}}}
          {{{ DropdownList styles=styles list=users stub=dropListStub onClick=onDropItemClick}}}
        </fieldset>
        {{#if chatListSettingsActive}}
          {{{ Button
            value='Добавить чат'
            class=styles.button
            onClick=handleAddChatPopup
            type='button'
          }}}
        {{/if}}
      </section>
    `
  }
}

registerComponent('ChatListMenu', ChatListMenu);

export default ChatListMenu;
