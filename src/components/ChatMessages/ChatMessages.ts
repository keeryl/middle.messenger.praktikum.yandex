import { Block } from '../../utils/Block';
import * as styles from './ChatMessages.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class ChatMessages extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props
    });
  }

  render(): string {
    return `
      <section class="{{styles.messages}}">
        <article class="{{styles.message}}">
        <nav>
          <p onclick="renderPage('page_404')"
            class="{{styles.messageText}} {{styles.messageText_type_link}}"
          >
            Страница 404
          </p>
          <p onclick="renderPage('page_500')" class="{{styles.messageText}} {{styles.messageText_type_link}}">Страница 500</p>
          <p onclick="renderPage('signin')" class="{{styles.messageText}} {{styles.messageText_type_link}}">Авторизация</p>
          <p onclick="renderPage('signup')" class="{{styles.messageText}} {{styles.messageText_type_link}}">Регистрация</p>
        </nav>
          <div class="{{styles.messageInfo}}">
            <span class="{{styles.messageTime}}">12:15</span>
          </div>
        </article>
        <article class="{{styles.message}}">
          <p class="{{styles.messageText}}">
          Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
          Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
          </p>
          <p class="{{styles.messageText}}">
            Привет! Это второй абзац в этом сообщении.
          </p>
          <div class="{{styles.messageInfo}}">
            <span class="{{styles.messageTime}}">12:15</span>
          </div>
        </article>
        <article class="{{styles.message}} {{styles.message_type_self}}">
          <p class="{{styles.messageText}}">
          Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.
          Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.
          </p>
          <p class="{{styles.messageText}}">
            Привет! Это второй абзац в этом сообщении.
          </p>
            <div class="{{styles.messageInfo}}">
            <div class="{{styles.messageStatus}}">
              <div class="{{styles.statusFirstCheck}}"></div>
              <div class="{{styles.statusSecondCheck}}"></div>
            </div>
            <span class="{{styles.messageTime}} {{styles.messageTime_type_self}}">12:15</span>
            </div>
        </article>
        <article class="{{styles.message}} {{styles.message_type_self}}">
          <p class="{{styles.messageText}}">
            Привет. Ок!
          </p>
            <div class="{{styles.messageInfo}}">
              <div class="{{styles.messageStatus}}">
                <div class="{{styles.statusFirstCheck}}"></div>
              </div>
              <span class="{{styles.messageTime}} {{styles.messageTime_type_self}}">12:15</span>
          </div>
        </article>
      </section>
    `
  }
}

registerComponent('ChatMessages', ChatMessages);

export default ChatMessages;



