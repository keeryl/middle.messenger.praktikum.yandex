import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';

class Button extends Block {
  constructor(props: any) {
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
