import { Block } from '../../utils/Block.js';
import * as styles from './ChatMessanger.module.css';
import ChatHeader from '../ChatHeader/ChatHeader.js';
import ChatMessages from '../ChatMessages/ChatMessages.js';
import ChatInput from '../ChatInput/ChatInput.js';
import registerComponent from '../../utils/registerComponent.js';

class ChatMessanger extends Block {
  constructor(props) {
    super({
      styles,
      props
    });
  }

  render() {
    return `
      <section class="{{styles.chatMessanger}}">

        {{{ ChatHeader }}}
        {{{ ChatMessages }}}
        {{{ ChatInput }}}

      </section>
    `
  }
}

registerComponent('ChatMessanger', ChatMessanger);

export default ChatMessanger;


{/* <p class="{{styles.defaultMessage}}">
Выберите чат чтобы отправить сообщение
</p> */}
