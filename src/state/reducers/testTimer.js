const reducer = (
  state = {
    time:
      localStorage.getItem("time") === null
        ? 30
        : parseInt(localStorage.getItem("time")),
    liveTime:
      localStorage.getItem("time") === null
        ? 30
        : parseInt(localStorage.getItem("time")),
    forDisplay: displayTime(
      localStorage.getItem("time") === null
        ? 30
        : parseInt(localStorage.getItem("time"))
    ),
  },
  action
) => {
  switch (action.type) {
    case "RESET_LIVE_TIME":
      return {
        ...state,
        liveTime: state.time,
        forDisplay: displayTime(state.time),
      };
    case "DECREMENT_LIVE_TIME":
      return {
        ...state,
        liveTime: state.liveTime - 1,
        forDisplay: displayTime(state.liveTime - 1),
      };
    case "UPDATE_TEST_TIMER":
      localStorage.setItem("time", action.payload);
      return {
        time: parseInt(localStorage.getItem("time")),
        liveTime: parseInt(localStorage.getItem("time")),
        forDisplay: displayTime(parseInt(localStorage.getItem("time"))),
      };
    default:
      return state;
  }
};

function displayTime(time) {
  let minutes = parseInt(time / 60, 10);
  let seconds = parseInt(time % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return { minutes: minutes, seconds: seconds };
}

export default reducer;
