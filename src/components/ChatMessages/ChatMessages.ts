import { Block } from '../../utils/Block';
import * as styles from './ChatMessages.module.css';
import registerComponent from '../../utils/registerComponent';
import { withStore } from '../../hocs/withStore';
import { ChatMessage } from '../ChatMessage/ChatMessage';
import { isEqual } from '../../utils/helpers';
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

  componentDidUpdate(oldProps: any, newProps: any) {
    if (!isEqual(oldProps.messages, newProps.messages)) {
      return true;
    } else {
      return false;
    }
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
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
  };
}

export const ChatMessages = withStore(mapStateToProps)(ChatMessagesBlock);

registerComponent('ChatMessages', ChatMessages);
