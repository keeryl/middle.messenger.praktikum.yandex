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
    this.props.selected = () => this.props.chatProps.id === this.props.selectedChatId;
  }

  handleClick(e: Event) {
    this.props.chatProps.id === this.props.selectedChatId ?
      store.set('selectedChat', {
        _id: null,
        _avatar: null,
        _title : null
      })
      :
      ChatsController.selectChat({
        _id: this.props.chatProps.id,
        _avatar: this.props.chatProps.avatar,
        _title : this.props.chatProps.title
      });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (this.props.chatProps.id === newProps.selectedChatId ||
      this.props.chatProps.id === oldProps.selectedChatId
      ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return `
        <li class="{{styles.chatItem}} {{#if selected}}{{styles.selected}}{{/if}}">
          <div class="{{styles.img-container}}">
            {{#if chatProps.avatar}}
              <img class="{{styles.img}}" src="https://ya-praktikum.tech/api/v2/resources{{chatProps.avatar}}", alt="Аватар чата">
            {{/if}}
          </div>
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
  selectedChatId: state.selectedChat?._id || null
});


export const ChatItem = withStore(mapStateToProps)(ChatItemBlock);
registerComponent('ChatItem', ChatItem);
