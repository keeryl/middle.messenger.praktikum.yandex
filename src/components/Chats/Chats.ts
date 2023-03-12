import { Block } from '../../utils/Block';
import * as styles from './Chats.module.css';
import { ChatItem } from '../ChatItem/ChatItem';
import registerComponent from '../../utils/registerComponent';
import { withStore } from '../../hocs/withStore';
import ChatsController from '../../controllers/ChatsController';

ChatItem


type Props = {
  [key: string]: unknown
}

class ChatsBlock extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
  }

  init() {
    ChatsController.fetchChats();
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    // if (JSON.stringify(oldProps.chats)===JSON.stringify(newProps.chats)) {
    //   return false;
    // } else {
    //   console.log('CHATS UPDATED');
    //   return true;
    // }
    return true;
  }

  render(): string {
    return `
      <ul class="{{styles.chats}}">
        {{#each chats}}
        {{{ ChatItem
          chatProps=this
        }}}
        {{/each}}
      </ul>
    `
  }
}

const mapStateToProps = (state: any) => ({
  chats: { ...(state.chats || [] )}
});

export const Chats = withStore(mapStateToProps)(ChatsBlock);

registerComponent('Chats', Chats);
