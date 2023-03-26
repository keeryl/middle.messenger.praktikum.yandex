import { Block } from '../../utils/Block';
import * as styles from './SearchInput.module.css';
import registerComponent from '../../utils/registerComponent';

type Props = {
  [key: string]: unknown
}

class SearchInput extends Block {

  constructor(props: Props) {
    super({
      styles,
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
    if (newProps.value === '') {
      return true;
    }
    return false;  }

  render(): string {
    return `
      <input class="{{styles.searchInput}}" placeholder="Поиск" value={{value}}>
    `
  }
}

registerComponent('SearchInput', SearchInput);

export default SearchInput;
