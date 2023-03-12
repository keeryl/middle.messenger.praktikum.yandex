import { Block } from '../../utils/Block';
import * as styles from './ChatList.module.css';
import registerComponent from '../../utils/registerComponent';
import Router from '../../utils/Router';
import SearchInput from '../SearchInput/SearchInput';
import { Chats } from '../Chats/Chats';
import ChatListMenu from '../ChatListMenu/ChatListMenu';

SearchInput
ChatListMenu
Chats

type Props = {
  [key: string]: unknown
}

class ChatList extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
      handleProfileClick: () => this.handleProfileClick(),
    });
  }

  handleProfileClick() {
    Router.go('/profile');
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      // if (component instanceof SearchInput) {
      //   component.setProps({

      //   });
      // }
      if (component instanceof ChatListMenu) {
        component.setProps({
          chatListSettingsActive: newProps.chatListSettingsActive,
        });
      }
    });
    return false;
  }

  render(): string {
    return `
      <section class="{{styles.chatList}}">
        {{{ ChatListMenu
          onChatListSettingsClick=onChatListSettingsClick
          chatListSettingsActive=chatListSettingsActive
          handleAddChatPopup=handleAddChatPopup
        }}}
        {{{ Chats }}}
      </section>
    `
  }
}

registerComponent('ChatList', ChatList);

export default ChatList;
