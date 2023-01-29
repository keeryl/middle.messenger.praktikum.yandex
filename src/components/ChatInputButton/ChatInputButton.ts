import { Block } from '../../utils/Block';
import * as styles from './ChatInputButton.module.css';
import registerComponent from '../../utils/registerComponent';

class ChatInputButton extends Block {
  constructor(props: any) {
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



