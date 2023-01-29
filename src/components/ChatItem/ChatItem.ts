import { Block } from '../../utils/Block';
import * as styles from './ChatItem.module.css';
import registerComponent from '../../utils/registerComponent';

class ChatItem extends Block {

  constructor(props: any) {
    super({ styles, ...props });
  }

  render() {
    return `
        <li class="{{styles.chatItem}}">
          <div class="{{styles.img}}"></div>
          <div class="{{styles.title}}">
            <p class="{{styles.userName}}">{{props.userName}}</p>
            <p class="{{styles.lastMessage}}">{{props.lastMessage}}</p>
          </div>
          <div class="{{styles.info}}">
            <p class="{{styles.time}}">{{props.time}}</p>
            <div class="{{styles.counter}}">{{props.counter}}</div>
          </div>
        </li>
      `
  }
}

registerComponent('ChatItem', ChatItem);

export default ChatItem;
