import { Block } from '../../utils/Block';
import ChatList from '../../components/ChatList/ChatList';
import { ChatMessanger } from '../../components/ChatMessanger/ChatMessanger'
import * as styles from './chat.module.css';
import useInputValidation from '../../utils/inputValidator';
import ChatSettingsPopup from '../../components/ChatSettingsPopup/ChatSettingsPopup';
import AddChatPopup from '../../components/AddChatPopup/AddChatPopup';
import AddUserPopup from '../../components/AddUserPopup/AddUserPopup';
import DeleteUserPopup from '../../components/DeleteUserPopup/DeleteUserPopup';
const [formValues, errors, validateInput, validateForm] = useInputValidation();
import registerComponent from '../../utils/registerComponent';
import MessagesController from '../../controllers/MessagesController';
import ChatsController from '../../controllers/ChatsController';
import { withStore } from '../../hocs/withStore';
import AvatarPopup from '../../components/AvatarPopup/AvatarPopup';
ChatList

type Props = {
  [key: string]: unknown
}

class ChatBlock extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      settingsPopupIsOpened: false,
      chatListSettingsActive: false,
      addChatPopupIsOpened: false,
      addUserPopupIsOpened: false,
      avatarPopupIsOpened: false,
      deleteUserPopupIsOpened: false,
      formValues: {...formValues},
      errors: {...errors},
      validateInput: validateInput,
      validateForm: validateForm,
      isMessageInvalid: () => Object.values(this.props.errors.message).some(v => v === false),
      isLoginInvalid: () => Object.values(this.props.errors.login).some(v => v === false),
      isChatTitleInvalid: () => Object.values(this.props.errors.chatTitle).some(v => v === false),
      isMessageSubmitBtnDisabled: 'disabled',
      isPopupBtnDisabled: 'disabled',
      onMessageInput: (e: Event) => this.handleMessageInput(e),
      onPopupInput: (e: Event) => this.handlePopupInput(e),
      onAddChatInput: (e: Event) => this.handleAddChatPopupInput(e),
      onPopupFocusout: (e: Event) => this.handlePopupInputFocusout(e),
      onSettingsClick: () => this.handleSettingsClick(),
      onChatListSettingsClick: () => this.handleChatListSettingsClick(),
      handleAddChatPopup: () => this.handleAddChatPopup(),
      handleAddUserPopup: () => this.handleAddUserPopup(),
      handleAvatarPopup: () => this.handleAvatarPopup(),
      handleDeleteUserPopup: () => this.handleDeleteUserPopup(),
      handleDeleteChat: () => this.handleDeleteChat(),
      closeAllPopups: () => this.closeAllPopups(),
      events: {
        submit: (e: Event) => this.handleMessageSubmit(e),
        click: (e: Event) => this.handleClick(e)
      }
    });
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
      addChatPopupIsOpened: false,
      avatarPopupIsOpened: false,
      formValues: {
        ...this.props.formValues,
        login: '',
        chatTitle: ''
      }
    });
  }

  handleAddChatPopup() {
    this.setProps({
      addChatPopupIsOpened: !this.props.addChatPopupIsOpened,
    });
  }

  handleAvatarPopup() {
    this.setProps({
      avatarPopupIsOpened: !this.props.avatarPopupIsOpened,
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

  handleAddChatPopupInput(event: Event) {
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
      isPopupBtnDisabled: !this.props.isChatTitleInvalid() ? '' : 'disabled'
    });
  }

  handlePopupInputFocusout(event: Event) {
    event;
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
    const { message } = this.props.formValues;
    MessagesController.sendMessage(this.props.selectedChatId, message);
    this.setProps({
      formValues: {
        ...this.props.formValues,
        message: '',
      },
      isMessageSubmitBtnDisabled: 'disabled'
    });
    ChatsController.fetchChats();
  }

  handleSettingsClick() {
    this.setProps({
      settingsPopupIsOpened: !this.props.settingsPopupIsOpened
    });
  }

  handleChatListSettingsClick() {
    this.setProps({
      chatListSettingsActive: !this.props.chatListSettingsActive
    });
  }

  handleDeleteChat() {
    this.closeAllPopups();
    ChatsController.delete(this.props.selectedChatId)
      .then(res => {
        if (res) {
          ChatsController.fetchChats()
            .then(() => {
              ChatsController.selectChat({
                _id: this.props.chats[0].id || null,
                _avatar: this.props.chats[0].avatar || null,
                _title : this.props.chats[0].title || null
              });
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    oldProps;
    Object.values(this.children).forEach(component => {
      if (component instanceof ChatMessanger) {
        component.setProps({
          message: newProps.formValues.message,
          buttonState: newProps.isMessageSubmitBtnDisabled,
        });
      }
      if (component instanceof ChatSettingsPopup) {
        component.setProps({
          settingsPopupIsOpened: newProps.settingsPopupIsOpened,
        });
      }
      if (component instanceof AddChatPopup) {
        component.setProps({
          addChatPopupIsOpened: newProps.addChatPopupIsOpened,
          isPopupBtnDisabled: newProps.isPopupBtnDisabled,
          formValues: newProps.formValues,
          errors: newProps.errors
        });
      }
      if (component instanceof AddUserPopup) {
        component.setProps({
          addUserPopupIsOpened: newProps.addUserPopupIsOpened,
          selectedChatId: newProps.selectedChatId
        });
      }
      if (component instanceof DeleteUserPopup) {
        component.setProps({
          deleteUserPopupIsOpened: newProps.deleteUserPopupIsOpened,
          selectedChatId: newProps.selectedChatId
        });
      }
      if (component instanceof AvatarPopup) {
        component.setProps({
          avatarPopupIsOpened: newProps.avatarPopupIsOpened,
          selectedChatId: newProps.selectedChatId
        });
      }
      if (component instanceof ChatList) {
        component.setProps({
          chatListSettingsActive: newProps.chatListSettingsActive,
        });
      }
    });
    return false;
  }

  render() {
    return `
      <main class="{{styles.chat}}">
        {{{ ChatList
          onChatListSettingsClick=onChatListSettingsClick
          chatListSettingsActive=chatListSettingsActive
          handleAddChatPopup=handleAddChatPopup
        }}}
        {{{ ChatMessanger
          message=formValues.message
          onMessageInput=onMessageInput
          buttonState=isMessageSubmitBtnDisabled
          onSettingsClick=onSettingsClick
          handleAvatarPopup=handleAvatarPopup
        }}}
        {{{ ChatSettingsPopup
          settingsPopupIsOpened=settingsPopupIsOpened
          handleAddUserPopup=handleAddUserPopup
          handleDeleteUserPopup=handleDeleteUserPopup
          handleDeleteChat=handleDeleteChat
        }}}
        {{{ AddChatPopup
          addChatPopupIsOpened=addChatPopupIsOpened
          isPopupBtnDisabled=isPopupBtnDisabled
          onPopupInput=onAddChatInput
          onPopupFocusout=onPopupFocusout
          formValues=formValues
          errors=errors
          closeAllPopups=closeAllPopups
        }}}
        {{{ AddUserPopup
          addUserPopupIsOpened=addUserPopupIsOpened
          selectedChatId=selectedChatId
        }}}
        {{{ DeleteUserPopup
          deleteUserPopupIsOpened=deleteUserPopupIsOpened
          selectedChatId=selectedChatId
        }}}
        {{{ AvatarPopup
          avatarPopupIsOpened=avatarPopupIsOpened
          selectedChatId=selectedChatId
          closeAllPopups=closeAllPopups
        }}}
      </main>
    `
  }
}


const mapStateToProps = (state: any) => ({
  selectedChatId: state.selectedChat?._id,
  chats: { ...(state.chats || [] )}
});

export const Chat = withStore(mapStateToProps)(ChatBlock);

registerComponent('Chat', Chat);
