import { Block } from '../../utils/Block.js';
import * as styles from './AuthInput.module.css';
import registerComponent from '../../utils/registerComponent.js';

class AuthInput extends Block {
  constructor(props) {
    super({styles, props});
  }

  render() {
    return `
      <label class="{{styles.label}}">
        {{props.label}}
        <input
          class="{{styles.input}}"
          name="{{props.name}}"
          type="{{props.type}}"
        >
      </label>
    `
  }
}
registerComponent('AuthInput', AuthInput);

export default AuthInput;
