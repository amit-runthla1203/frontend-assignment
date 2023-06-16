import { SET_CRICKETER_DATA } from "./Action";

const initialState = {
  cricketerData: []
};

const reducerFunction = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CRICKETER_DATA:
      return { ...state, cricketerData: [...payload] };
    default:
      return state;
  }
};

export default reducerFunction;
