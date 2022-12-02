import { Block } from '../../utils/Block.js';
import * as styles from './AuthButton.module.css';
import registerComponent from '../../utils/registerComponent.js';

class AuthButton extends Block {
  constructor(props) {
    super({styles, props});
  }

  render() {
    return `
      <button class="{{styles.button}}">
        {{props.buttonText}}
      </button>
    `
  }
}
registerComponent('AuthButton', AuthButton);

export default AuthButton;
