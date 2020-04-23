import { AnyAction } from "redux";
import { SUCCESS, LoadSuccessAction } from "redux/actions/events";

export interface UserEvent {
  id: number,
  title: string,
  dateStart: string,
  dateEnd: string,
}

interface state {
  byIds: Record<UserEvent["id"], UserEvent>;
  allIds: UserEvent["id"][];
}

const initialState: state ={
  byIds: {},
  allIds: [],
}

const reducer = (state: state = initialState, action: LoadSuccessAction) => {
  switch (action.type) {
    case SUCCESS: {
      const { events } = action.payload;
      return ({
        ...state,
        allIds: [...events].map((event) => event.id),
        byIds: [...events].reduce<state['byIds']>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {})
      })
    }
    default:
      return state;
  }
};

export default reducer;
