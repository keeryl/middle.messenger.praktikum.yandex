import store, { StoreEvents } from '../utils/Store';
import { Block } from '../utils/Block';

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){

    return class WithStore extends Component {

      constructor(props: any) {

        super({ ...props,  ...mapStateToProps(store.getState()) });

        store.on(StoreEvents.Updated, () => {

          this.setProps({ ...mapStateToProps(store.getState()) });
        });

      }
    }

  }

}
