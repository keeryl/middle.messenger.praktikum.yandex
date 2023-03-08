import { Block } from '../../utils/Block';
import * as styles from './ChatHeader.module.css';
import registerComponent from '../../utils/registerComponent';
import Button from '../Button/Button';
import ChatSettingsPopup from '../ChatSettingsPopup/ChatSettingsPopup';
Button
ChatSettingsPopup

type Props = {
  [key: string]: unknown
}

class ChatHeader extends Block {
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
          <h2 class="{{styles.chatName}}">Название чата</h2>
        </div>
        {{{ Button type="button" class=styles.chatSettings value="" onClick=onSettingsClick }}}
      </section>
    `
  }
}

registerComponent('ChatHeader', ChatHeader);

export default ChatHeader;
