import { Block } from '../../utils/Block';
import * as styles from './ChatMessage.module.css';
import registerComponent from '../../utils/registerComponent';
import { withStore } from '../../hocs/withStore';

type Props = {
  [key: string]: unknown
}

class ChatMessageBlock extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
    this.props.isMine = this.props.userId === this.props.message.user_id;
    this.props.time = this.props.message.time.slice(11,16);
  }


  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }


  render() {
    return `
      <li class="{{styles.message}} {{#if isMine}} {{styles.message_type_self}} {{/if}}">
        <p class="{{styles.messageText}}">
          {{message.content}}
        </p>
        <div class="{{styles.messageInfo}}">
          <div class="{{styles.messageStatus}}">
            <div class="{{styles.statusFirstCheck}}"></div>
            {{#if message.is_read}}
            <div class="{{styles.statusSecondCheck}}"></div>
            {{/if}}
          </div>
          <time class="{{styles.messageTime}} {{#if isMine}} {{styles.messageTime_type_self}} {{/if}}">
            {{time}}
          </time>
        </div>
      </li>
    `
  }
}

const mapStateToProps = (state: any) => ({
  userId: state.user.id,
});

export const ChatMessage = withStore(mapStateToProps)(ChatMessageBlock);

registerComponent('ChatMessage', ChatMessage);
