import { Block } from '../../utils/Block.js';
import * as styles from './ChatHeader.module.css';
import registerComponent from '../../utils/registerComponent.js';

class ChatHeader extends Block {
  constructor(props) {
    super({
      styles,
      props
    });
  }

  render() {
    return `

      <section class="{{styles.chatHeader}}">
        <div class="{{styles.chatInfo}}">
          <div class="{{styles.chatImage}}"></div>
          <h2 class="{{styles.chatName}}">Название чата</h2>
        </div>
        <button class="{{styles.chatSettings}}"></button>
      </section>

    `
  }
}

registerComponent('ChatHeader', ChatHeader);

export default ChatHeader;
