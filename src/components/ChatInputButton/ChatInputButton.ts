import { Block } from '../../utils/Block';
import * as styles from './ChatInputButton.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class ChatInputButton extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props
    });

  }

  render() {
    return `
      <button type="submit" class="{{styles.button}}" {{buttonState}}></button>
    `
  }
}

registerComponent('ChatInputButton', ChatInputButton);

export default ChatInputButton;



