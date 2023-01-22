import { Block } from '../../utils/Block.js';
import * as styles from './ChatInput.module.css';
import registerComponent from '../../utils/registerComponent.js';
import ChatInputButton from '../ChatInputButton/ChatInputButton.js';

class ChatInput extends Block {
  constructor(props) {
    super({
      ...props,
      styles,
      events: {
        input: (event) => this.onInputChange(event),
      }
    });
  }

  checkInputValidity () {
  }

  onInputChange(event) {
    this.props.onMessageInput(event);
  }

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatInputButton) {
        component.setProps({
          buttonState: newProps.buttonState,
        });
      }
    });
    return false;
  }

  render() {
    return `

      <form class="{{styles.chatInput}}">
        <button class="{{styles.settingsBtn}}"></button>
        <input name="message" class="{{styles.messageInput}}" value="{{message}}">
        {{{ ChatInputButton buttonState=buttonState }}}
      </form>

    `
  }
}

registerComponent('ChatInput', ChatInput);

export default ChatInput;



