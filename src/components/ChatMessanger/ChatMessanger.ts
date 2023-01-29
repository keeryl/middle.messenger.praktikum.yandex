import { Block } from '../../utils/Block';
import * as styles from './ChatMessanger.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';
import registerComponent from '../../utils/registerComponent';
ChatHeader
ChatMessages

class ChatMessanger extends Block {
  constructor(props: any) {
    super({
      styles,
      ...props
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
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
