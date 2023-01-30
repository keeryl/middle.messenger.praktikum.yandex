import { Block } from '../../utils/Block';
import * as styles from './InputErrorMessage.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class InputErrorMessage extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
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
