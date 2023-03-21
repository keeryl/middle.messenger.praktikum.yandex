import { Block } from '../../utils/Block';
import * as styles from './ChatMessages.module.css';
import registerComponent from '../../utils/registerComponent';
import { withStore } from '../../hocs/withStore';
import { ChatMessage } from '../ChatMessage/ChatMessage';
ChatMessage

type Props = {
  [key: string]: unknown
}

class ChatMessagesBlock extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props
    });
  }

  render(): string {
    return `
      <ul class="{{styles.messages}}">
        {{#if messages}}
          {{#each messages}}
            {{{ ChatMessage
              message=this
            }}}
          {{/each}}
        {{/if}}
      </ul>
    `
  }
}

const mapStateToProps = (state: any) => {
  const selectedChatId = state.selectedChat._id;

  if (!selectedChatId) {
    return {
      messages: [],
      // selectedChat: null,
      // userId: state.user.id
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    // selectedChat: state.selectedChat,
    // userId: state.user.id
  };
}

export const ChatMessages = withStore(mapStateToProps)(ChatMessagesBlock);

registerComponent('ChatMessages', ChatMessages);
