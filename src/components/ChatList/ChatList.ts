import { Block } from '../../utils/Block';
import * as styles from './ChatList.module.css';
import registerComponent from '../../utils/registerComponent';
import Router from '../../utils/Router';
import SearchInput from '../SearchInput/SearchInput';
import Chats from '../Chats/Chats';
// import { withStore } from '../../hocs/withStore';

SearchInput
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
      if (component instanceof Chats) {
        component.setProps({
          chats: newProps.chats,
          // selectedChat: newProps.selectedChat
        });
      }
    });
    return false;
  }

  render(): string {
    return `
      <section class="{{styles.chatList}}">
        {{{ Button
          value="Профиль >"
          class=styles.navButton
          type="button"
          onClick=handleProfileClick
        }}}
        {{{ SearchInput }}}
        {{{ Chats
          chats=chats
          selectedChat=selectedChat
        }}}
      </section>
    `
  }
}

registerComponent('ChatList', ChatList);

export default ChatList;
