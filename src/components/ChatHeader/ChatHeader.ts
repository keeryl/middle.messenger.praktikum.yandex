import { Block } from '../../utils/Block';
import * as styles from './ChatHeader.module.css';
import registerComponent from '../../utils/registerComponent';
import Button from '../Button/Button';
import ChatSettingsPopup from '../ChatSettingsPopup/ChatSettingsPopup';
import { withStore } from '../../hocs/withStore';
Button
ChatSettingsPopup

type Props = {
  [key: string]: unknown
}

class ChatHeaderBlock extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
  }

  render() {
    return `
      <section class="{{styles.chatHeader}}">
        <div class="{{styles.chatInfo}}">
          <div class="{{styles.chatImage}}"></div>
          <h2 class="{{styles.chatName}}">{{chatTitle}}</h2>
        </div>
        {{{ Button type="button" class=styles.chatSettings value="" onClick=onSettingsClick }}}
      </section>
    `
  }
}

// const mapStateToProps = (state: any) => ({
//   selectedChatTitle: state.selectedChat?._title
// });

const mapStateToProps = (state: any) => {
  const selectedChatId = state.selectedChat._id;
  const title = (state.chats as Array<any>).find(item => item.id === selectedChatId)?.title

  return {
    chatTitle: title || null
  };
}

export const ChatHeader = withStore(mapStateToProps)(ChatHeaderBlock);

registerComponent('ChatHeader', ChatHeader);
