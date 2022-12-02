import { Block } from '../../utils/Block.js';
import ProfileInput from '../../components/ProfileInput/ProfileInput.js';
import * as styles from './Profile.module.css';
import registerComponent from '../../utils/registerComponent.js';


class Profile extends Block {
  constructor(props) {
    super({
      styles,
      props,
      methods: {
        onFocusinProfile: () => this.onFocusin(),
        onFocusoutProfile: () => this.onFocusout(),
      }
    });
    console.log(this.props)
  }

  onFocusin() {
    console.log('FOCUSE IN');
  }

  onFocusout() {
    console.log('FOCUSE OUT');
  }

  render() {

    return `
      <main class="{{styles.profile-window}}">
      <button onclick="renderPage('chat')" class="{{styles.back-btn}}">
        <div class="{{styles.arrow}}"></div>
      </button>
      <section class="{{styles.profile}}">
        <form class="{{styles.form}}">
          <div class="{{styles.user-img}}"></div>
          <h1 class="{{styles.user-name}}">Кирилл</h1>
          <fieldset class="{{styles.user-info}}">
            {{{ ProfileInput
              profileProps=this
              label="Почта"
              name="email"
              value="user@yandex.ru"
              type="email"
            }}}
            {{{ ProfileInput
              profileProps=this
              label="Логин"
              name="login"
              value="keeryl"
              type="text"
            }}}
            {{{ ProfileInput
              profileProps=this
              label="Имя"
              name="first_name"
              value="Кирилл"
              type="text"
            }}}
            {{{ ProfileInput
              profileProps=this
              label="Фамилия"
              name="second_name"
              value="Иванов"
              type="text"
            }}}
            {{{ ProfileInput
              profileProps=this
              label="Имя в чате"
              name="display_name"
              value="Кирилл"
              type="text"
            }}}
            {{{ ProfileInput
              profileProps=this
              label="Телефон"
              name="phone"
              value="+7 (926) 453-23-23"
              type="tel"
            }}}
          </fieldset>
          <button class="{{styles.btn}}">Изменить данные</button>
          <button class="{{styles.btn}}">Изменить пароль</button>
          <button class="{{styles.btn}}">Выйти</button>
        </form>
      </section>
      </main>
    `
  }
}

registerComponent('Profile', Profile);


export default Profile;
