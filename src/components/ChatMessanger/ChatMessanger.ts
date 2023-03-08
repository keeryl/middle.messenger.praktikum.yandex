import { Block } from '../../utils/Block';
import * as styles from './ChatMessanger.module.css';
import ChatHeader from '../ChatHeader/ChatHeader';
import { ChatMessages } from '../ChatMessages/ChatMessages';
import ChatInput from '../ChatInput/ChatInput';
import registerComponent from '../../utils/registerComponent';
// import { withStore } from '../../hocs/withStore';
ChatHeader
ChatMessages

type Props = {
  [key: string]: unknown
}

class ChatMessanger extends Block {
  constructor(props: Props) {
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
    if (oldProps.selectedChat === newProps.selectedChat) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return `
      <section class="{{styles.chatMessanger}}">
        {{#if selectedChat}}
          {{{ ChatHeader onSettingsClick=onSettingsClick}}}
          {{{ ChatMessages }}}
          {{{ ChatInput
            message=message
            onMessageInput=onMessageInput
            buttonState=buttonState
          }}}
        {{else}}
          <p class="{{styles.defaultMessage}}">
            Выберите чат, чтобы отправить сообщение
          </p>
        {{/if}}
      </section>
    `
  }
}

registerComponent('ChatMessanger', ChatMessanger);


export default ChatMessanger;

