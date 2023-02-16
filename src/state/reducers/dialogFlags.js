const reducer = (state = { capsLock: false }, action) => {
  switch (action.type) {
    case "SWITCH_CAPS_LOCK_ON":
      return { capsLock: true };
    case "SWITCH_CAPS_LOCK_OFF":
      return { capsLock: false };
    default:
      return state;
  }
};

export default reducer;
