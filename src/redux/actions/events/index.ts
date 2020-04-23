import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'redux/store';
import { UserEvent } from 'redux/reducers/userEvents';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export interface LoadRequestAction extends Action<typeof REQUEST> {}

export interface LoadSuccessAction extends Action<typeof SUCCESS> {
  payload: {
    events: UserEvent[],
  }
}

export interface LoadFailureAction extends Action<typeof FAILURE> {
  payload: {
    message: string,
  }
}

export const loadEvents = (): ThunkAction<
void,
RootState,
undefined,
LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch) => {
  dispatch({
    type: REQUEST,
  });
  try {
    const response = await fetch('http://localhost:3001/events');
    const events: UserEvent[] = await response.json();
    dispatch({
      type: SUCCESS,
      payload: { events },
    });
  } catch (error) {
    dispatch({
      type: FAILURE,
      payload: { message: 'Failed to load events' },
    });
  }
};
