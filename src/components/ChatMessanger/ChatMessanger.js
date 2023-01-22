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
      ...props
    });
  }

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatInput) {
        component.setProps({
          message: newProps.message,
          buttonState: newProps.buttonState,
        });
      }
    });
    return false;
  }

  render() {
    return `
      <section class="{{styles.chatMessanger}}">

        {{{ ChatHeader }}}
        {{{ ChatMessages }}}
        {{{ ChatInput
          message=message
          onMessageInput=onMessageInput
          buttonState=buttonState
        }}}

      </section>
    `
  }
}

registerComponent('ChatMessanger', ChatMessanger);

export default ChatMessanger;


{/* <p class="{{styles.defaultMessage}}">
Выберите чат чтобы отправить сообщение
</p> */}
