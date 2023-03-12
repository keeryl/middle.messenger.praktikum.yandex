import { Block } from '../../utils/Block';
import * as styles from './ChatInput.module.css';
import registerComponent from '../../utils/registerComponent';
import ChatInputButton from '../ChatInputButton/ChatInputButton';
import MessagesController from '../../controllers/MessagesController';

type Props = {
  [key: string]: unknown
}

class ChatInput extends Block {
  constructor(props: Props) {
    super({
      ...props,
      styles,
      events: {
        input: (event: Event) => this.onInputChange(event),
        submit: (event: Event) => this.handleMessageSubmit(event)
      }
    });
  }

  checkInputValidity () {
  }

  handleMessageSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    console.log('MESSAGE SUBMIT', this.props.message);
    MessagesController.sendMessage(this.props.selectedChat.id, this.props.message);
  }

  onInputChange(event: Event) {
    this.props.onMessageInput(event);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatInputButton) {
        component.setProps({
          buttonState: newProps.buttonState,
        });
      }
    });
    return false;
  }

  render() {
    return `
      <form class="{{styles.chatInput}}">
        <button class="{{styles.settingsBtn}}" type="button"></button>
        <input name="message" class="{{styles.messageInput}}" value="{{message}}">
        {{{ ChatInputButton buttonState=buttonState }}}
      </form>
    `
  }
}

registerComponent('ChatInput', ChatInput);

export default ChatInput;


