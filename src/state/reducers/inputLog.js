import { current } from "@reduxjs/toolkit";

const reducer = (state = { log: [], wrongWords: 0, errors: 0 }, action) => {
  switch (action.type) {
    case "UPDATE_INPUT_LOG":
      return inputLogUpdater(
        action.payload.enteredWord,
        action.payload.currentWord,
        state
      );
    case "INCREMENT_ERROR_LOG":
      return { ...state, errors: state.errors + 1 };
    case "DECREMENT_ERROR_LOG":
      return { ...state, errors: state.errors - 1 };
    case "RESET_INPUT_LOG":
      return { log: [], wrongWords: 0, errors: 0 };
    default:
      return state;
  }
};

function inputLogUpdater(enteredWord, currentWord, prevInputLog) {
  let updatedInputLog = [];
  if (currentWord.key > prevInputLog.log.length) {
    updatedInputLog = prevInputLog.log;
    updatedInputLog[currentWord.index] = enteredWord;
  } else {
    updatedInputLog = prevInputLog.log;
    updatedInputLog.splice(currentWord.index, 1);
  }
  const wrongWords = updatedInputLog.filter((prevLog) => !prevLog.isComplete);
  updatedInputLog = {
    log: updatedInputLog,
    wrongWords: wrongWords.length,
    errors: prevInputLog.errors,
  };
  return updatedInputLog;
}

export default reducer;
