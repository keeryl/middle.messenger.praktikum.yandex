import { Block } from '../../utils/Block.js';
import * as styles from './ChatInput.module.css';
import registerComponent from '../../utils/registerComponent.js';

class ChatInput extends Block {
  constructor(props) {
    super({
      styles,
      props
    });
  }

  render() {
    return `

      <section class="{{styles.chatInput}}">
        <button class="{{styles.settingsBtn}}"></button>
        <input class="{{styles.messageInput}}">
        <button class="{{styles.submitBtn}}"></button>
      </section>

    `
  }
}

registerComponent('ChatInput', ChatInput);

export default ChatInput;



