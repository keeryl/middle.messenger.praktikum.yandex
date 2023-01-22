import { Block } from '../../utils/Block.js';
import * as styles from './ChatInputButton.module.css';
import registerComponent from '../../utils/registerComponent.js';

class ChatInputButton extends Block {
  constructor(props) {
    super({
      styles,
      ...props,
    });

  }

  render() {
    return `
      <button class="{{styles.button}}" {{buttonState}}></button>
    `
  }
}

registerComponent('ChatInputButton', ChatInputButton);

export default ChatInputButton;



