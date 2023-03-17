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
          <h2 class="{{styles.chatName}}">{{selectedChatTitle}}</h2>
        </div>
        {{{ Button type="button" class=styles.chatSettings value="" onClick=onSettingsClick }}}
      </section>
    `
  }
}

const mapStateToProps = (state: any) => ({
  selectedChatTitle: state.selectedChat?.title
});

export const ChatHeader = withStore(mapStateToProps)(ChatHeaderBlock);

registerComponent('ChatHeader', ChatHeader);
