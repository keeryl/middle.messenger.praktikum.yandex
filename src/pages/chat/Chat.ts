import { Block } from '../../utils/Block';
import ChatList from '../../components/ChatList/ChatList';
import ChatMessanger from '../../components/ChatMessanger/ChatMessanger'
import * as styles from './Chat.module.css';


class Chat extends Block {
  constructor(props: any) {
    super({
      styles,
      ...props,
      isMessageInvalid: () => Object.values(this.props.errors.message).some(v => v === false),
      buttonState: 'disabled',
      onMessageInput: (e: Event) => this.handleMessageInput(e),
      events: {
        submit: (e: Event) => this.handleMessageSubmit(e)
      }
    });
  }

  handleMessageInput (event: Event) {
    const { name, value } = event.target as HTMLInputElement;
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

  handleMessageSubmit (event: Event) {
    event.preventDefault();
    const { message } = this.props.formValues
    console.log('SUBMIT', {message: message});
  }

  componentDidUpdate(oldProps: any, newProps: any) {
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
