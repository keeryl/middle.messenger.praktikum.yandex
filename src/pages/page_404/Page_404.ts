import * as styles from './Page_404.module.css';
import { Block } from '../../utils/Block';

class Page_404 extends Block {
  constructor(props: any) {
    super({styles, ...props});
  }

  render() {
    return `
      <main class="{{styles.page-404}}">
        <h1 class="{{styles.title}}">404</h1>
        <h2 class="{{styles.subtitle}}">Не туда попали</h2>
        <p
          onclick="renderPage('chat')"
          class="{{styles.btn}}"
        >
          Назад к чатам
        </p>
      </main>
    `
  }
}

export default Page_404;
