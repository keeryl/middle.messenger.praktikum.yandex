import * as styles from './ChatSettingsPopup.module.css';
import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';
import Button from '../Button/Button';
Button

type Props = {
  [key: string]: unknown
}

class ChatSettingsPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
    this.props.state = () => this.props.settingsPopupIsOpened ? this.props.styles.popupOpened : '';
  }

  render() {
    return `
      <div class="{{styles.popup}} {{state}}" id="popup-settings">
        <div class="{{styles.settingsMenu}}">
          {{{ Button
            value='Добавить пользователя'
            class=styles.addBtn
            onClick=handleAddUserPopup
            type='button'
          }}}
          {{{
            Button value='Удалить пользователя'
            class=styles.deleteBtn
            onClick=handleDeleteUserPopup
            type='button'
          }}}
          {{{
            Button value='Удалить чат'
            class=styles.deleteBtn
            onClick=handleDeleteChat
            type='button'
          }}}
        </div>
      </div>
    `
  }
}

registerComponent('ChatSettingsPopup', ChatSettingsPopup);

export default ChatSettingsPopup;
