import { Block } from '../../utils/Block.js';
import ChatList from '../../components/ChatList/ChatList.js';
import ChatMessanger from '../../components/ChatMessanger/ChatMessanger.js'
import * as styles from './Chat.module.css';

class Chat extends Block {
  constructor(props) {
    super({
      styles,
      ...props,
      isMessageInvalid: () => Object.values(this.props.errors.message).some(v => v === false),
      buttonState: 'disabled',
      onMessageInput: (e) => this.handleMessageInput(e),
      events: {
        submit: (e) => this.handleMessageSubmit(e)
      }
    });
  }

  handleMessageInput (event) {
    const { name, value } = event.target;
    this.setProps({
      formValues: {
        ...this.props.formValues,
        [name]: value
      }
    });
    this.setProps({
      errors: {
        ...this.props.errors,
        [name]: this.props.validateInput(name, value)
      }
    });
    this.setProps({
      buttonState: !this.props.isMessageInvalid() ? '' : 'disabled'
    });
  }

  handleMessageSubmit (event) {
    event.preventDefault();
    const { message } = this.props.formValues
    console.log('SUBMIT', {message: message});
  }

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatMessanger) {
        component.setProps({
          message: newProps.formValues.message,
          buttonState: newProps.buttonState,
        });
      }
    });
    return false;
  }

  render() {
    return `

      <main class="{{styles.chat}}">
        {{{ ChatList }}}
        {{{
          ChatMessanger
            message=formValues.message
            onMessageInput=onMessageInput
            buttonState=buttonState
        }}}
      </main>

    `
  }
}

export default Chat;
