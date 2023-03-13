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
      <li class="{{styles.message}}">
        <p class="{{styles.messageText}}">
          {{message.content}}
        </p>
        <div class="{{styles.messageInfo}}">
          <time class="{{styles.messageTime}}">{{message.time}}</time>
        </div>
      </li>
    `
  }
}

registerComponent('ChatMessage', ChatMessage);

export default ChatMessage;

