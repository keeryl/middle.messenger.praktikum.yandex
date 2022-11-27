import { Block } from '../../utils/Block.js';
import * as styles from './chat.module.css';
// import template from './chat.hbs';
// const chatTemplate = template({ styles });
// export default chatTemplate;

class Chat extends Block {
  constructor(props) {
    super({
      styles: styles
    });
  }

  render() {
    return `
    <main class="{{styles.chat}}">
    <section class="{{styles.chat__left-window}}">
      <button onclick="renderPage('profile')" class="{{styles.chat__profile-btn}}">Профиль ></button>
      <input class="{{styles.chat__search-input}}" placeholder="Поиск">
      <ul class="{{styles.chat__chats}}">
      </ul>
    </section>
    <section class="{{styles.chat__right-window}}">
      <div class="{{styles.chat__header}}">
        <div class="{{styles.chat__info}}">
          <div class="{{styles.chat__image}}"></div>
          <h2 class="{{styles.chat__title}}"></h2>
        </div>
        <button class="{{styles.chat__settings-btn}}"></button>
      </div>

      <div class="{{styles.chat__messages}}">
        <article class="{{styles.chat__message}}"></article>
      </div>

      <div class="{{styles.message__input}}">
        <button class="{{styles.typer__settings-btn}}"></button>
        <input class="{{styles.typer__input}}">
        <button class="{{styles.typer__submit-btn}}"></button>
      </div>
      {{!-- <p class="{{styles.chat__message}}">Выберите чат чтобы отправить сообщение</p>
      <nav class="{{styles.chat__temporary-nav}}">
        <ul class="{{styles.chat__temporary-nav__items}}">
          <li class="{{styles.chat__temporary-nav__item}}">
            <p onclick="renderPage('page_404')" class="{{styles.temporary-nav__link}}">Страница 404</p>
          </li>
          <li class="{{styles.chat__temporary-nav__item}}">
            <p onclick="renderPage('page_500')" class="{{styles.temporary-nav__link}}">Страница 500</p>
          </li>
          <li class="{{styles.chat__temporary-nav__item}}">
            <p onclick="renderPage('signin')" class="{{styles.temporary-nav__link}}">Авторизация</p>
          </li>
          <li class="{{styles.chat__temporary-nav__item}}">
            <p onclick="renderPage('signup')" class="{{styles.temporary-nav__link}}">Регистрация</p>
          </li>
        </ul>
      </nav> --}}
    </section>
  </main>
  `
  }
}

export default Chat;
