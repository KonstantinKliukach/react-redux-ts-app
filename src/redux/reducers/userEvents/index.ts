import { LOAD_SUCCESS, LoadSuccessAction, ADD_SUCCESS, AddSuccessAction, DeleteSuccessAction, DELETE_SUCCESS, UPDATE_SUCCESS, UpdateSuccessAction } from 'redux/actions/events';

export interface UserEvent {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
}

interface state {
  byIds: Record<UserEvent['id'], UserEvent>;
  allIds: UserEvent['id'][];
}

const initialState: state = {
  byIds: {},
  allIds: [],
};

type EventActions = LoadSuccessAction | AddSuccessAction | DeleteSuccessAction | UpdateSuccessAction

const reducer = (state: state = initialState, action: EventActions): state => {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const { events } = action.payload;
      return ({
        ...state,
        allIds: [...events].map((event) => event.id),
        byIds: [...events].reduce<state['byIds']>((byIds, event) => {
          byIds[event.id] = event;
          return byIds;
        }, {}),
      });
    }
    case ADD_SUCCESS: {
      const { event } = action.payload;
      return { ...state,
        allIds: [...state.allIds, event.id],
        byIds: {
          ...state.byIds, [event.id]: event,
        } };
    }
    case DELETE_SUCCESS: {
      const { id } = action.payload;
      const newState: state = {
        ...state,
        byIds: {
          ...state.byIds,
        },
        allIds: state.allIds.filter((eventId) => eventId != id),
      };
      delete newState.byIds[id];
      return newState;
    }

    case UPDATE_SUCCESS: {
      const { event } = action.payload;
      return { ...state,
        byIds: {
          ...state.byIds, [event.id]: event,
        } };
    }
    default:
      return state;
  }
};

export default reducer;
