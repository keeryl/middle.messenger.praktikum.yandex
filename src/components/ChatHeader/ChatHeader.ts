import { Block } from '../../utils/Block';
import * as styles from './ChatHeader.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class ChatHeader extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props
    });
  }

  render() {
    return `
      <section class="{{styles.chatHeader}}">
        <div class="{{styles.chatInfo}}">
          <div class="{{styles.chatImage}}"></div>
          <h2 class="{{styles.chatName}}">Название чата</h2>
        </div>
        <button class="{{styles.chatSettings}}" type="button"></button>
      </section>
    `
  }
}

registerComponent('ChatHeader', ChatHeader);

export default ChatHeader;
