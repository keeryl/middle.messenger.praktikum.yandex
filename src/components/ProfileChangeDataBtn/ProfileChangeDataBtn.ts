import { Block } from '../../utils/Block';
import * as styles from './ProfileChangeDataBtn.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class ProfileChangeDataBtn extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      events: {
        click: (event: Event) => this.handleClick(event),
      },
    });

  }

  handleClick(event: Event) {
    this.props.onDataChange(event);
  }

  render() {
    return `
      <button class="{{styles.btn}}" type="button" {{ isButtonDisabled }}>Изменить данные</button>
    `
  }
}

registerComponent('ProfileChangeDataBtn', ProfileChangeDataBtn);

export default ProfileChangeDataBtn;
