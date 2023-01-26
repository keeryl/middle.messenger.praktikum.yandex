import { Block } from '../../utils/Block.js';
// import * as styles from './ChatInputButton.module.css';
import registerComponent from '../../utils/registerComponent.js';

class Button extends Block {
  constructor(props) {
    super({
      // styles,
      ...props,
      events: {
        click: (e) => this.handleButtonClick(e)
      }
    });

  }

  handleButtonClick (e) {
    this.props.onClick();
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



