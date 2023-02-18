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
        click: () => this.handleClick()
      }
    });

  }

  handleClick() {
    console.log('click')
    this.props.onDataChange();
  }

  render() {
    return `
      <button class="{{styles.btn}}" type="button" {{ isButtonDisabled }}>Изменить данные</button>
    `
  }
}

registerComponent('ProfileChangeDataBtn', ProfileChangeDataBtn);

export default ProfileChangeDataBtn;
