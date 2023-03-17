import { Block } from '../../utils/Block';
import * as styles from './Chats.module.css';
import { ChatItem } from '../ChatItem/ChatItem';
import registerComponent from '../../utils/registerComponent';
import { withStore } from '../../hocs/withStore';
import ChatsController from '../../controllers/ChatsController';
import { isEqual } from '../../utils/helpers';

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
    console.log('INIT - CHATS, fetchChats()')
    ChatsController.fetchChats();
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (!isEqual(oldProps.chats, newProps.chats)) {
      console.log('CHATS PROPS IS NOT EQUAL - UPDATE')
      return true;
    } else {
      return false;
    }
  }

  render(): string {
    console.log('RENDER CHATS')
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
