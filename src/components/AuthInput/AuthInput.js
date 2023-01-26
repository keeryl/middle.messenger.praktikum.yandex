import { Block } from '../../utils/Block.js';
import * as styles from './AuthInput.module.css';
import InputErrorMessage from '../../components/InputErrorMessage/InputErrorMessage.js';
import registerComponent from '../../utils/registerComponent.js';

class AuthInput extends Block {
  constructor(props) {
    super({
      styles,
      ...props,
      error: '',
      isValid: () => (this.props.errors.required && this.props.errors.format),
      events: {
        focusout: (event) => this.onFocusout(event),
        input: (event) => this.onInputChange(event),
      },
    });

  }

  onFocusout(event) {
    this.props.onFocusout(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  onInputChange(event) {
    this.props.onChange(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  componentDidUpdate(oldProps, newProps) {
    Object.values(this.children).forEach(component => {
      if (component instanceof InputErrorMessage) {
        component.setProps({
          error: newProps.error
        });
      }
    });
    return false;
  }

  init() {}

  componentDidMount() {}

  render() {

    return `
      <label class="{{styles.label}}">
        {{ label }}
        <input
          class="{{styles.input}}"
          name="{{name}}"
          type="{{type}}"
          value={{value}}
        >
        {{{
          InputErrorMessage
            error=error
        }}}
      </label>
    `
  }
}
registerComponent('AuthInput', AuthInput);

export default AuthInput;
