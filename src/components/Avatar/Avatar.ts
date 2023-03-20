import * as styles from './Avatar.module.css';
import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class Avatar extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
      events: {
        click: () => this.props.onAvatarClick(),
      },
     });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps.avatar === newProps.avatar) {
      return false;
    }
    return true;
  }

  render() {
    return `
    <div class="{{styles.img-container}}">
      {{#if avatar}}
        <img class="{{styles.img}}" src="https://ya-praktikum.tech/api/v2/resources{{avatar}}" alt="Аватар">
      {{/if}}
     <div class="{{styles.overlay}}"></div>
    </div>
    `
  }
}

registerComponent('Avatar', Avatar);

export default Avatar;
