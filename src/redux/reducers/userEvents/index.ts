import { AnyAction } from "redux";

interface UserEvent {
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

const reducer = (state: state = initialState, action: AnyAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
