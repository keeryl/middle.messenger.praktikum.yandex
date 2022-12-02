import { Block } from '../../utils/Block.js';
import ChatList from '../../components/ChatList/ChatList.js';
import ChatMessanger from '../../components/ChatMessanger/ChatMessanger.js'
import * as styles from './Chat.module.css';




class Chat extends Block {
  constructor(props) {
    super({styles, props});
  }

  render() {
    return `

      <main class="{{styles.chat}}">
        {{{ ChatList }}}
        {{{ ChatMessanger }}}
      </main>

    `
  }
}

export default Chat;
