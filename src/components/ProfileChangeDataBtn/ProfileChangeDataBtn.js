import { Block } from '../../utils/Block.js';
import * as styles from './ProfileChangeDataBtn.module.css';
import registerComponent from '../../utils/registerComponent.js';

class ProfileChangeDataBtn extends Block {
  constructor(props) {
    super({
      styles,
      ...props,
      events: {
        click: (event) => this.handleClick(event),
      },
    });

  }

  handleClick(event) {
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
