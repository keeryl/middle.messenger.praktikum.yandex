import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class DropdownItem extends Block {
  constructor(props: Props) {
    super({
      ...props,
      events: {
        click: (e: Event) => this.handleClick(e)
      }
    });

  }

  handleClick (e: Event) {
    this.props.onClick(this.props.id, this.props.login);
  }

  render() {
    return `
    <li class="{{class}}">{{login}}</li>
    `
  }
}

registerComponent('DropdownItem', DropdownItem);

export default DropdownItem;
