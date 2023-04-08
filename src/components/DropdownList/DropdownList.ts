import { Block } from '../../utils/Block';
import registerComponent from '../../utils/registerComponent';
import DropdownItem from '../DropdownItem/DropdownItem';
DropdownItem

type Props = {
  [key: string]: unknown
}

class DropdownList extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
  }


  componentDidUpdate(oldProps: any, newProps: any) {
    oldProps;
    newProps;
    return true;
  }

  render() {
    return `
          {{#if list}}
            <ul class="{{styles.items}}">
                {{#each list}}
                  {{{ DropdownItem
                    login=this.login
                    id=this.id
                    onClick=@root.onClick
                    class=@root.styles.item
                  }}}
                {{/each}}
            </ul>
          {{else}}
            <p class="{{styles.stub}}">{{stub}}</p>
          {{/if}}
    `
  }
}

registerComponent('DropdownList', DropdownList);

export default DropdownList;
