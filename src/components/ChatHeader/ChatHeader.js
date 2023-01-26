import { Block } from '../../utils/Block.js';
import * as styles from './ChatHeader.module.css';
import registerComponent from '../../utils/registerComponent.js';

class ChatHeader extends Block {
  constructor(props) {
    super({
      styles,
      ...props
    });
  }

  handleSettingClick () {
    console.log('click')
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

    // <div class="{{styles.settingsTooltip}}">
    //   <button class="{{styles.tooltipBtn}}" type="button">Добавить пользователя</button>
    //   <button class="{{styles.tooltipBtn}}" type="button">Удалить пользователя</button>
    // </div>
  }
}

registerComponent('ChatHeader', ChatHeader);

export default ChatHeader;
