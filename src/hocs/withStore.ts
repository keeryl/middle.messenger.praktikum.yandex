import store, { StoreEvents } from '../utils/Store';
import { Block } from '../utils/Block';
import { isEqual } from '../utils/helpers';

export function withStore(mapStateToProps: (state: any) => any) {

  return function wrap(Component: typeof Block){

    return class WithStore extends Component {

      constructor(props: any) {
        let state = mapStateToProps(store.getState());
        super({ ...props,  ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());
          if (!isEqual(state, newState)) {
            console.log('!isEqual', newState);
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    }

  }

}
