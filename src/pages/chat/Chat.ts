import { Block } from '../../utils/Block';
import ChatList from '../../components/ChatList/ChatList';
import ChatMessanger from '../../components/ChatMessanger/ChatMessanger'
import * as styles from './Chat.module.css';
import useInputValidation from '../../utils/inputValidator';
import ChatSettingsPopup from '../../components/ChatSettingsPopup/ChatSettingsPopup';
import AddUserPopup from '../../components/AddUserPopup/AddUserPopup';
import DeleteUserPopup from '../../components/DeleteUserPopup/DeleteUserPopup';
const [formValues, errors, validateInput, validateForm] = useInputValidation();
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../hocs/withStore';
import registerComponent from '../../utils/registerComponent';
ChatList

type Props = {
  [key: string]: unknown
}

class Chat extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      settingsPopupIsOpened: false,
      addUserPopupIsOpened: false,
      deleteUserPopupIsOpened: false,
      formValues: {...formValues},
      errors: {...errors},
      validateInput: validateInput,
      validateForm: validateForm,
      isMessageInvalid: () => Object.values(this.props.errors.message).some(v => v === false),
      isLoginInvalid: () => Object.values(this.props.errors.login).some(v => v === false),
      isMessageSubmitBtnDisabled: 'disabled',
      isPopupBtnDisabled: 'disabled',
      onMessageInput: (e: Event) => this.handleMessageInput(e),
      onPopupInput: (e: Event) => this.handlePopupInput(e),
      onPopupFocusout: (e: Event) => this.handlePopupInputFocusout(e),
      onSettingsClick: () => this.handleSettingsClick(),
      handleAddUserPopup: () => this.handleAddUserPopup(),
      handleDeleteUserPopup: () => this.handleDeleteUserPopup(),
      events: {
        submit: (e: Event) => this.handleMessageSubmit(e),
        click: (e: Event) => this.handleClick(e)
      }
    });
  }

  init() {
    ChatsController.fetchChats();
  }

  handleClick(e: Event) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    (e.target as HTMLElement).id.split('-')[0] === 'popup' && this.closeAllPopups();
  }

  closeAllPopups() {
    this.setProps({
      addUserPopupIsOpened: false,
      deleteUserPopupIsOpened: false,
      settingsPopupIsOpened: false,
      formValues: {
        ...this.props.formValues,
        login: ''
      }
    });
  }

  handleAddUserPopup() {
    this.setProps({
      addUserPopupIsOpened: !this.props.addUserPopupIsOpened,
      settingsPopupIsOpened: false,
    });
  }

  handleDeleteUserPopup() {
    this.setProps({
      deleteUserPopupIsOpened: !this.props.deleteUserPopupIsOpened,
      settingsPopupIsOpened: false,
    });
  }

  handlePopupInput(event: Event) {
    const { name, value } = event.target as HTMLInputElement;
    this.setProps({
      formValues: {
        ...this.props.formValues,
        [name]: value
      },
      errors: {
        ...this.props.errors,
        [name]: this.props.validateInput(name, value)
      },
      isPopupBtnDisabled: !this.props.isLoginInvalid() ? '' : 'disabled'
    });
  }

  handlePopupInputFocusout(event: Event) {

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
      isMessageSubmitBtnDisabled: !this.props.isMessageInvalid() ? '' : 'disabled'
    });
  }

  handleMessageSubmit(event: Event) {
    event.preventDefault();
    const { message } = this.props.formValues
    console.log('SUBMIT', {message: message});
  }

  handleSettingsClick() {
    this.setProps({
      settingsPopupIsOpened: !this.props.settingsPopupIsOpened
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatMessanger) {
        component.setProps({
          message: newProps.formValues.message,
          buttonState: newProps.isMessageSubmitBtnDisabled,
          selectedChat: newProps.selectedChat
        });
      }
      if (component instanceof ChatSettingsPopup) {
        component.setProps({
          settingsPopupIsOpened: newProps.settingsPopupIsOpened,
        });
      }
      if (component instanceof AddUserPopup) {
        component.setProps({
          addUserPopupIsOpened: newProps.addUserPopupIsOpened,
          isPopupBtnDisabled: newProps.isPopupBtnDisabled,
          formValues: newProps.formValues,
          errors: newProps.errors
        });
      }
      if (component instanceof DeleteUserPopup) {
        component.setProps({
          deleteUserPopupIsOpened: newProps.deleteUserPopupIsOpened,
          isPopupBtnDisabled: newProps.isPopupBtnDisabled,
          formValues: newProps.formValues,
          errors: newProps.errors
        });
      }
      if (component instanceof ChatList) {
        component.setProps({
          chats: newProps.chats,
          // selectedChat: newProps.selectedChat
        });
      }
    });
    return false;
  }

  render() {
    return `
      <main class="{{styles.chat}}">
        {{{ ChatList
          chats=chats
          selectedChat=selectedChat
        }}}
        {{{ ChatMessanger
          message=formValues.message
          onMessageInput=onMessageInput
          buttonState=isMessageSubmitBtnDisabled
          onSettingsClick=onSettingsClick
          selectedChat=selectedChat
        }}}
        {{{ ChatSettingsPopup
          settingsPopupIsOpened=settingsPopupIsOpened
          handleAddUserPopup=handleAddUserPopup
          handleDeleteUserPopup=handleDeleteUserPopup
        }}}
        {{{ AddUserPopup
          addUserPopupIsOpened=addUserPopupIsOpened
          isPopupBtnDisabled=isPopupBtnDisabled
          onPopupInput=onPopupInput
          onPopupFocusout=onPopupFocusout
          formValues=formValues
          errors=errors
        }}}
        {{{ DeleteUserPopup
          deleteUserPopupIsOpened=deleteUserPopupIsOpened
          isPopupBtnDisabled=isPopupBtnDisabled
          onPopupInput=onPopupInput
          onPopupFocusout=onPopupFocusout
          formValues=formValues
          errors=errors
        }}}
      </main>
    `
  }
}

// registerComponent('Chat', Chat);
// export default Chat;

const mapStateToProps = (state: any) => ({
  chats: { ...(state.chats || [] )},
  // selectedChat: (state.selectedChat || null)
});

export const ChatPage = withStore(mapStateToProps)(Chat);
