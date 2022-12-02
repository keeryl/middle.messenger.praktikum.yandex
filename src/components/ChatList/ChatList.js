import { Block } from '../../utils/Block.js';
import * as styles from './ChatList.module.css';
import ChatItem from '../ChatItem/ChatItem.js';
import registerComponent from '../../utils/registerComponent.js';

class ChatList extends Block {

  constructor(props) {
    super({ styles, props });
  }

  render() {
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
