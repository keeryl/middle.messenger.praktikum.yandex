import { Block } from '../../utils/Block';
import * as styles from './ChatMessage.module.css';
import registerComponent from '../../utils/registerComponent';
import { withStore } from '../../hocs/withStore';

type Props = {
  [key: string]: unknown
}

class ChatMessage extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
  }


  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }


  render() {
    return `
      <article class="{{styles.message}}">
        <p class="{{styles.messageText}}">
        </p>
        <div class="{{styles.messageInfo}}">
          <time class="{{styles.messageTime}}">12:15</time>
        </div>
      </article>
    `
  }
}

registerComponent('ChatMessage', ChatMessage);

export default ChatMessage;

