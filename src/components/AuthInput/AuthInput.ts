import { Block } from '../../utils/Block';
import * as styles from './AuthInput.module.css';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class AuthInput extends Block {
  constructor(props: Props) {
    super({
      styles,
      ...props,
      error: '',
      isValid: () => (this.props.errors.required && this.props.errors.format),
      events: {
        focusout: (event: Event) => this.onFocusout(event),
        input: (event: Event) => this.onInputChange(event),
      },
    });

  }

  onFocusout(event: Event) {
    this.props.onFocusout(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  onInputChange(event: Event) {
    this.props.onChange(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    oldProps;
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
