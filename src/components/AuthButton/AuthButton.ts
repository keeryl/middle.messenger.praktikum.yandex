import { Block } from '../../utils/Block';
import * as styles from './AuthButton.module.css';
import registerComponent from '../../utils/registerComponent';

class AuthButton extends Block {
  constructor(props: any) {
    super({
      styles,
      ...props,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps.isButtonDisabled === newProps.isButtonDisabled) {
      return false;
    }
    return true;
  }


  render() {
    return `
      <button
        class="{{styles.button}}"
       {{isButtonDisabled}}
      >
        {{buttonText}}
      </button>
    `
  }
}
registerComponent('AuthButton', AuthButton);

export default AuthButton;
