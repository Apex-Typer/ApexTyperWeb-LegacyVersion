const reducer = (state = false, action) => {
  switch (action.type) {
    case "ENABLE_SHOW_RESULT":
      return true;
    case "DISABLE_SHOW_RESULT":
      return false;
    default:
      return state;
  }
};

export default reducer;
