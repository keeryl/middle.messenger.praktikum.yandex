import store, { StoreEvents } from '../utils/Store';
import { Block } from '../utils/Block';

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){
    let previousState: any;

    return class WithStore extends Component {

      constructor(props: any) {

        previousState = mapStateToProps(store.getState());
        super({ ...props,  ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });

      }
    }

  }

}
