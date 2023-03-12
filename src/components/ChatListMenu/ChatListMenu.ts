import { Block } from '../../utils/Block';
import * as styles from './ChatListMenu.module.css';
import registerComponent from '../../utils/registerComponent';
import Router from '../../utils/Router';
import SearchInput from '../SearchInput/SearchInput';
SearchInput

type Props = {
  [key: string]: unknown
}

class ChatListMenu extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
      handleProfileClick: () => this.handleProfileClick(),
    });
  }

  handleProfileClick() {
    Router.go('/profile');
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    // Object.values(this.children).forEach(component => {
      // if (component instanceof SearchInput) {
      //   component.setProps({

      //   });
      // }
    // });
    if (oldProps.chatListSettingsActive === newProps.chatListSettingsActive) {
      return false;
    } else {
      return true;
    }
  }

  render(): string {
    return `
      <section class="{{styles.chatListMenu}}">
        <nav class="{{styles.nav}}">
          {{{ Button
            type="button"
            class=styles.settings
            value=""
            onClick=onChatListSettingsClick
          }}}
          {{{ Button
            value="Профиль >"
            class=styles.navButton
            type="button"
            onClick=handleProfileClick
          }}}
        </nav>
        {{{ SearchInput }}}
        {{#if chatListSettingsActive}}
          {{{ Button
            value='Добавить чат'
            class=styles.button
            onClick=handleAddChatPopup
            type='button'
          }}}
        {{/if}}
      </section>
    `
  }
}

registerComponent('ChatListMenu', ChatListMenu);

export default ChatListMenu;
