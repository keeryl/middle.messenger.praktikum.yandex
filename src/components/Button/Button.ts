import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class Button extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (e: Event) => this.handleButtonClick(e)
      }
    });

  }

  handleButtonClick (e: Event) {
    this.props.onClick(e);
  }

  render() {
    return `
      <button class="{{class}}" type="{{type}}">
        {{value}}
      </button>
    `
  }
}

registerComponent('Button', Button);

export default Button;
