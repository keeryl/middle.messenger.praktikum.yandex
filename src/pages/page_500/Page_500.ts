import * as styles from './Page_500.module.css';
import { Block } from '../../utils/Block';

class Page_500 extends Block {
  constructor(props: any) {
    super({ styles, ...props });
  }

  render() {
    return `
      <main class="{{styles.page-500}}">
        <h1 class="{{styles.title}}">500</h1>
        <h2 class="{{styles.subtitle}}">Мы уже фиксим</h2>
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

export default Page_500;
