import { Block } from '../../utils/Block';
import * as styles from './Chats.module.css';
import {ChatItem} from '../ChatItem/ChatItem';
import registerComponent from '../../utils/registerComponent';
// import { withStore } from '../../hocs/withStore';

ChatItem


type Props = {
  [key: string]: unknown
}

class Chats extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
    console.log("CHATS", this);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    // Object.values(this.children).forEach(component => {
    //   if (component instanceof ChatItem) {
    //     component.setProps({
    //       selectedChat: newProps.selectedChat
    //     });
    //   }
    // });
    if (JSON.stringify(oldProps.chats)===JSON.stringify(newProps.chats)) {
      return false;
    } else {
      console.log("CHATS UPDATED")
      return true;
    }
    // return false;
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

registerComponent('Chats', Chats);

export default Chats;

// const mapStateToProps = (state: any) => ({
//   chats: { ...(state.chats || [] )}
// });

// export const Chats = withStore(mapStateToProps)(ChatsBlock);

// registerComponent('Chats', Chats);
