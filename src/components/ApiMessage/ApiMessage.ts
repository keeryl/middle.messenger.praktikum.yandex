import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class ApiMessage extends Block {

  constructor(props: Props) {
    super({
      ...props
     });
    }

  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  render() {
    return `
    <p class="{{class}}">{{message}}</p>
    `
  }
}

registerComponent('ApiMessage', ApiMessage);

export default ApiMessage;
