import { Block } from '../../utils/Block';
import * as styles from './AuthButton.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class AuthButton extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
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
