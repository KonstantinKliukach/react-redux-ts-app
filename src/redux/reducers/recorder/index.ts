
import { RecorderAction, START, STOP } from 'redux/actions/recorder';
import { RootState } from 'redux/store';

interface IState {
  dateStart: string,
  dateEnd: string,
}

const initialState: IState = {
  dateStart: '',
  dateEnd: '',
};

export const getRecorderState = (rootState: RootState) => (rootState.recorder);
export const getStartDate = (rootState: RootState) => (getRecorderState(rootState).dateStart);

const reducer = (state: IState = initialState, action: RecorderAction) => {
  switch (action.type) {
    case START: {
      return {
        ...state,
        dateStart: new Date().toISOString(),
        dateEnd: '',
      };
    }
    case STOP: {
      return {
        ...state,
        dateStart: '',
        dateEnd: new Date().toISOString(),
      };
    }
    default:
      return state;
  }
};

export default reducer;
