import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from 'redux/store';
import { UserEvent } from 'redux/reducers/userEvents';
import { getStartDate } from 'redux/reducers/recorder';

export const LOAD_REQUEST = 'LOAD_REQUEST';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAILURE = 'LOAD_FAILURE';

export const ADD_REQUEST = 'ADD_REQUEST';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const ADD_FAILURE = 'ADD_FAILURE';

export interface LoadRequestAction extends Action<typeof LOAD_REQUEST> {}

export interface LoadSuccessAction extends Action<typeof LOAD_SUCCESS> {
  payload: {
    events: UserEvent[],
  }
}

export interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
  payload: {
    message: string,
  }
}

export interface AddRequestAction extends Action<typeof ADD_REQUEST> {}

export interface AddSuccessAction extends Action<typeof ADD_SUCCESS> {
  payload: {
    event: UserEvent,
  }
}

export interface AddFailureAction extends Action<typeof ADD_FAILURE> {
  payload: {
    message: string,
  }
}

export const createEvent = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  AddRequestAction | AddSuccessAction | AddFailureAction
> => async (dispatch, getState) => {
  dispatch({
    type: ADD_REQUEST,
  });
  try {
    const dateStart = getStartDate(getState());
    // eslint-disable-next-line no-undef
    const newEvent: Omit<UserEvent, 'id'> = {
      title: 'new Event',
      dateStart,
      dateEnd: new Date().toISOString(),
    };
    const response = await fetch('http://localhost:3001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }
    );
    const createdEvent: UserEvent = await response.json();
    dispatch({
      type: ADD_SUCCESS,
      payload: {
        event: createdEvent,
      },
    });
  } catch (error) {
    dispatch({
      type: ADD_FAILURE,
      payload: {
        message: error,
      },
    });
  }
};

export const loadEvents = (): ThunkAction<
void,
RootState,
undefined,
LoadRequestAction | LoadSuccessAction | LoadFailureAction
> => async (dispatch) => {
  dispatch({
    type: LOAD_REQUEST,
  });
  try {
    const response = await fetch('http://localhost:3001/events');
    const events: UserEvent[] = await response.json();
    dispatch({
      type: LOAD_SUCCESS,
      payload: { events },
    });
  } catch (error) {
    dispatch({
      type: LOAD_FAILURE,
      payload: { message: 'Failed to load events' },
    });
  }
};
