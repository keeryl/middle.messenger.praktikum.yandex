import { Block } from '../../utils/Block';
import * as styles from './ChatItem.module.css';
import registerComponent from '../../utils/registerComponent';
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../hocs/withStore';
import store from '../../utils/Store';

type Props = {
  [key: string]: unknown
}

class ChatItemBlock extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
      selectedClass: '',
      events: {
        click: (e: Event) => this.handleClick(e)
      }
    });
    this.props.selectedClass = () => this.props.chatProps.id === this.props.selectedChatId ? this.props.styles.selected : '';
  }

  handleClick(e: Event) {
    // this.props.chatProps.id === this.props.selectedChat.id ?
    //   store.set('selectedChat.id', null)
    //   :
      ChatsController.selectChat(this.props.chatProps);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    // console.log('ChatItem', this);
    console.log('ChatItem componentDidUpdate');

    // if (this.props.chatProps.id === newProps.selectedChat.id ||
    //   this.props.chatProps.id === oldProps.selectedChat.id
    //   ) {
    //   return true;
    // } else {
    //   return false;
    // }
    return true;
  }

  render() {
    return `
        <li class="{{styles.chatItem}} {{selectedClass}}">
          <img
            class="{{styles.img}}"
            src="https://ya-praktikum.tech/api/v2/resources{{avatar}}"
            alt="Аватар чата"
          >
          <div class="{{styles.title}}">
            <p class="{{styles.userName}}">{{chatProps.title}}</p>
            <p class="{{styles.lastMessage}}">{{chatProps.last_message.content}}</p>
          </div>
          <div class="{{styles.info}}">
            <p class="{{styles.time}}">{{chatProps.time}}</p>
            {{#if chatProps.unread_count}}
              <div class="{{styles.counter}}">{{chatProps.unread_count}}</div>
            {{/if}}
          </div>
        </li>
      `
  }
}

const mapStateToProps = (state: any) => ({
  selectedChatId: state.selectedChat?.id || null
});
export const ChatItem = withStore(mapStateToProps)(ChatItemBlock);
registerComponent('ChatItem', ChatItem);
