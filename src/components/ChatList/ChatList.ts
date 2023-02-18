import { Block } from '../../utils/Block';
import * as styles from './ChatList.module.css';
import ChatItem from '../ChatItem/ChatItem';
import registerComponent from '../../utils/registerComponent';
import Router from '../../utils/Router';
ChatItem

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

  render(): string {
    return `
      <section class="{{styles.chatList}}">
        {{{ Button value='Профиль >' class=styles.navButton type="button" onClick=handleProfileClick }}}
        <input
          class="{{styles.searchInput}}"
          placeholder="Поиск">
        <ul class="{{styles.chats}}">

          {{{ChatItem
            userName = props.userName
            lastMessage = props.lastMessage
            time = props.time
            counter = props.counter
          }}}

        </ul>
      </section>
    `
  }
}

registerComponent('ChatList', ChatList);

export default ChatList;
