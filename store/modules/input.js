import { createAction, handleActions } from "redux-actions";


const CHANGE = "input/CHANGE";
// const KEY_PRESS = "input/KEY_PRESS"
// const BLUR = "input/BLUR"

export const change = createAction(CHANGE);
// export const keyPress = createAction(KEY_PRESS);
// export const blur = createAction(BLUR)



const initialState = {
  term : ''
};

export default handleActions(
  {
    [change]: (state, action) => {
      return { term : action.payload };
    }
  },
  initialState
);
