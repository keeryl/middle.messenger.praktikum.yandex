import * as styles from './ProfileInput.module.css';
import { Block } from '../../utils/Block.js';
import registerComponent from '../../utils/registerComponent.js';

class ProfileInput extends Block {

  constructor(props) {
    super({
      styles,
      ...props,
      events: {
        focusin: (event) => this.onFocusin(event),
        focusout: (event) => this.onFocusout(event)
      },
     });
    console.log(this.props);
  }

  onFocusin(event) {
    console.log(event);
    this.props.profileProps.methods.onFocusinProfile();
  }

  onFocusout(event) {
    // console.log('FOCUSE OUT');
  }

  render() {
    return `
      <label class="{{styles.inputLabel}}">
        {{label}}
        <input
          class="{{styles.input}}"
          name="{{name}}"
          value="{{value}}"
          type="{{type}}"
        >
      </label>
    `
  }
}

registerComponent('ProfileInput', ProfileInput);

export default ProfileInput;
