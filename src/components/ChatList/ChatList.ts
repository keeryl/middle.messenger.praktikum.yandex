import { Block } from '../../utils/Block';
import * as styles from './ChatList.module.css';
import ChatItem from '../ChatItem/ChatItem';
import registerComponent from '../../utils/registerComponent';

class ChatList extends Block {

  constructor(props: any) {
    super({ styles, ...props });
  }

  render(): string {
    return `
      <section class="{{styles.chatList}}">
        <button
          onclick="renderPage('profile')"
          class="{{styles.navButton}}"
        >
          Профиль >
        </button>
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
