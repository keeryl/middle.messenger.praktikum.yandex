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
        click: (e: Event) => this.handleClick(e)
      }
    });

  }

  handleClick(e: Event) {
    this.props.onDataChange(e);
  }

  render() {
    return `
      <button class="{{styles.butn}}" type="{{type}}" {{isButtonDisabled}}>Изменить данные</button>
    `
  }
}

registerComponent('ProfileChangeDataBtn', ProfileChangeDataBtn);

export default ProfileChangeDataBtn;
