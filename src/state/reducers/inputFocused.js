const reducer = (state = false, action) => {
    switch (action.type) {
      case "FOCUS_INPUT":
        return true;
      case "BLUR_INPUT":
        return false;
      default:
        return state;
    }
  };
  
  export default reducer;