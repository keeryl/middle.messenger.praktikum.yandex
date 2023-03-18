import { Block } from '../../utils/Block';
import * as styles from '../../components/AddUserPopup/AddUserPopup.module.css';
import registerComponent from '../../utils/registerComponent';
// import AuthInput from '../AuthInput/AuthInput';
import Input from '../Input/Input';
import AuthButton from '../AuthButton/AuthButton';
import UserController from '../../controllers/UserController';
import DropdownList from '../DropdownList/DropdownList';
import { isEqual } from '../../utils/helpers';
Input

type Props = {
  [key: string]: unknown
}

class AddUserPopup extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      users: [],
      inputValue: '',
      selectedUser: '',
      dropListStub: '',
      onInput: (e: Event) => this.handleInput(e),
      onDropItemClick: (id: number, login: string) => this.handleDropitemClick(id, login),
      events: {
        submit: (e: Event) => this.handleSubmit(e),
        // input: (e: Event) => this.handleInput(e)
      }
    });
    this.props.state = () => this.props.addUserPopupIsOpened ? this.props.styles.popup_opened : '';
    this.props.buttonState = () => this.props.selectedUser ? '' : 'disabled' ;
  }

  handleInput(e: Event) {
    const { value } = e.target as HTMLInputElement;
    this.setProps({
      inputValue: value,
      selectedUser: ''
    });
    if (this.props.inputValue === '') {
      this.setProps({
        users: [],
        dropListStub: '',
      });
    } else {
      UserController.findUser(value)
      .then(res => {
        if ((res as []).length > 0) {
          this.setProps({
            users: res
          });
        } else {
          this.setProps({
            users: [],
            dropListStub: 'Не найдено',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
    }

  }

  handleDropitemClick(id: number, login: string) {
    console.log('CLICK CLAKC', id, login);
    this.setProps({
      selectedUser: login,
      users: [],
      dropListStub: '',
      inputValue: login,
    })

  }

  handleSubmit(e: Event) {
    // e.preventDefault();
    // e.stopPropagation();
    // console.log('SUBMIT ADD', this.props.formValues.login);
    // UserController.findUser(this.props.formValues.login)
    //   .then(res => {
    //     if (res) {
    //       console.log('RES FIND USER', res);
    //     }
    //   });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      // if (component instanceof AuthInput) {
      //   component.setProps({
      //     value: newProps.formValues.login,
      //     errors: newProps.errors.login,
      //   });
      // }
      if (component instanceof AuthButton) {
        component.setProps({
          isButtonDisabled: this.props.buttonState,
        });
      }
      if (component instanceof DropdownList) {
        component.setProps({
          list: newProps.users,
          stub: newProps.dropListStub
        });
      }
      if (component instanceof Input) {
        component.setProps({
          value: newProps.selectedUser,
        });
      }
    });
    if (oldProps.addUserPopupIsOpened === newProps.addUserPopupIsOpened) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return `
    <div class="{{styles.popup}} {{state}}" id="popup-addUser">
      <form class="{{styles.popup-form}}">
        <h2 class="{{styles.title}}">Добавить пользователя</h2>
        <fieldset class="{{styles.fieldset}}">
          {{{ Input
            class=styles.input
            type="text"
            value=selectedUser
            onChange=onInput
            placeholder="Поиск"
          }}}
          {{{ DropdownList styles=styles list=users stub=dropListStub onClick=onDropItemClick}}}
        </fieldset>
        {{{ AuthButton
          buttonText="Добавить"
          isButtonDisabled=buttonState
        }}}
      </form>
    </div>
    `
  }
}

registerComponent('AddUserPopup', AddUserPopup);

export default AddUserPopup;


// {{{ AuthInput
//   label="Логин"
//   name="login"
//   type="text"
//   errorMessage="Логин не введен или не соответствует формату"
//   value=formValues.login
//   errors=errors.login
//   onFocusout=onPopupFocusout
//   onChange=onPopupInput
// }}}
