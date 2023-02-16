const reducer = (state = { timeInput: false, timeMenu: false }, action) => {
  switch (action.type) {
    case "SHOW_TIME_INPUT":
      return { ...state, timeInput: true };
    case "CLOSE_TIME_INPUT":
      return { ...state, timeInput: false };
    case "SHOW_TIME_MENU":
      return { ...state, timeMenu: true };
    case "CLOSE_TIME_MENU":
      return { ...state, timeMenu: false };
    default:
      return state;
  }
};

export default reducer;
