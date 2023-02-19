import * as styles from './ProfileInput.module.css';
import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';
import InputErrorMessage from '../InputErrorMessage/InputErrorMessage';

type Props = {
  [key: string]: unknown
}

class ProfileInput extends Block {

  constructor(props: Props) {
    super({
      styles,
      ...props,
      error: '',
      isValid: () => (this.props.errors.required && this.props.errors.format),
      events: {
        input: (event: Event) => this.handleInputChange(event),
        focusout: (event: Event) => this.handleFocusout(event)
      },
     });
  }

  handleFocusout(event: Event) {
    this.props.onFocusout(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  handleInputChange (event: Event) {
    this.props.onChange(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    Object.values(this.children).forEach(component => {
      if (component instanceof InputErrorMessage) {
        component.setProps({
          error: newProps.error
        });
      }
    });
    if (oldProps.apiMessage !== newProps.apiMessage) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return `
    <div class="{{styles.wrapper}}">
      <label class="{{styles.inputLabel}}">
        {{label}}
        <input
          class="{{styles.input}}"
          name="{{name}}"
          value="{{value}}"
          type="{{type}}"
        >
      </label>
      {{{ InputErrorMessage error=error}}}
    </div>
    `
  }
}

registerComponent('ProfileInput', ProfileInput);

export default ProfileInput;
