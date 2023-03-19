import * as styles from './page_404.module.css';
import { Block } from '../../utils/Block';
import Router from '../../utils/Router';


type Props = {
  [key: string]: unknown
}

class Page_404 extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      onClick: () => this.onClick(),
    });
  }

  onClick() {
    Router.back();
  }

  render() {
    return `
      <main class="{{styles.page-404}}">
        <h1 class="{{styles.title}}">404</h1>
        <h2 class="{{styles.subtitle}}">Не туда попали</h2>
        {{{ Button
          type="button"
          value="Назад к чатам"
          class=styles.btn
          onClick=onClick
         }}}
      </main>
    `
  }
}

export default Page_404;
