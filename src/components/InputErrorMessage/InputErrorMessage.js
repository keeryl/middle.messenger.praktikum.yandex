import { Block } from '../../utils/Block.js';
import * as styles from './InputErrorMessage.module.css';
import registerComponent from '../../utils/registerComponent.js';

class InputErrorMessage extends Block {
  constructor(props) {
    super({
      styles,
      ...props,
    });
  }

  componentDidUpdate(oldProps, newProps) {
    if (oldProps.error === newProps.error) {
      return false;
    }
    return true;
  }

  render() {

    return `
      <p class={{styles.error}}>
        {{error}}
      </p>
    `
  }
}
registerComponent('InputErrorMessage', InputErrorMessage);

export default InputErrorMessage;
