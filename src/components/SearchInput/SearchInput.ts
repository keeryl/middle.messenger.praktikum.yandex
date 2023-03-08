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
    });
  }

  render(): string {
    return `
      <input class="{{styles.searchInput}}" placeholder="Поиск">
    `
  }
}

registerComponent('SearchInput', SearchInput);

export default SearchInput;
