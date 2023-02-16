const reducer = (state = false, action) => {
  switch (action.type) {
    case "TEST_ON":
      return true;
    case "TEST_OFF":
      return false;
    default:
      return state;
  }
};

export default reducer;
