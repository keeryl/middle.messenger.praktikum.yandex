import * as styles from './ProfileInput.module.css';
import { Block } from '../../utils/Block.js';
import registerComponent from '../../utils/registerComponent.js';
import InputErrorMessage from '../../components/InputErrorMessage/InputErrorMessage.js';


class ProfileInput extends Block {

  constructor(props) {
    super({
      styles,
      ...props,
      error: '',
      isValid: () => (this.props.errors.required && this.props.errors.format),
      events: {
        input: (event) => this.handleInputChange(event),
        focusout: (event) => this.handleFocusout(event)
      },
     });
    // console.log(this.props);
  }

  handleFocusout(event) {
    this.props.onFocusout(event);
    this.setProps({
      error: this.props.isValid() ? '' : this.props.errorMessage
    });
  }

  handleInputChange (event) {
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
