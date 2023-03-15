import { Block } from '../../utils/Block';
import * as styles from './ChatInput.module.css';
import registerComponent from '../../utils/registerComponent';
import ChatInputButton from '../ChatInputButton/ChatInputButton';
// import MessagesController from '../../controllers/MessagesController';

type Props = {
  [key: string]: unknown
}

class ChatInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      styles,
      events: {
        input: (event: Event) => this.onInputChange(event),
      }
    });
  }

  checkInputValidity () {
  }

  onInputChange(event: Event) {
    this.props.onMessageInput(event);
    (document.querySelector('input[name="message"]') as HTMLInputElement)
    .focus();
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatInputButton) {
        component.setProps({
          buttonState: newProps.buttonState,
        });
      }
    });
    if (newProps.message === '') {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return `
      <form class="{{styles.chatInput}}">
        <button class="{{styles.settingsBtn}}" type="button"></button>
        <input name="message" class="{{styles.messageInput}}" value="{{message}}" autofocus>
        {{{ ChatInputButton buttonState=buttonState }}}
      </form>
    `
  }
}

registerComponent('ChatInput', ChatInput);

export default ChatInput;


