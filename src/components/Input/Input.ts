import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class Input extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        input: (e: Event) => this.handleInput(e)
      }
    });

  }

  handleInput (e: Event) {
    this.props.onChange(e);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    if (oldProps.value !== newProps.value && newProps.value !== '') {
      return true;
    }
    return false;
  }

  render() {
    return `
      <input
        class="{{class}}"
        type="{{type}}"
        placeholder="{{placeholder}}"
        value={{value}}
      >
    `
  }
}

registerComponent('Input', Input);

export default Input;
