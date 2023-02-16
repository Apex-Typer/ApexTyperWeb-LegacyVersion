import { current } from "@reduxjs/toolkit";

const reducer = (
  state = { word: "", isWrong: false, isComplete: false },
  action
) => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return evaluateAndUpdateInput(
        action.payload.enteredWord,
        action.payload.currentWord
      );
    case "RESET_INPUT":
      return { word: "", isWrong: false, isComplete: false };
    default:
      return state;
  }
};

export default reducer;

function evaluateAndUpdateInput(enteredWord, currentWord) {
  let isWrong = false;
  let isComplete = false;
  let enteredWordLength = enteredWord.length;
  let currentWordLength = currentWord.length;
  let currentWordSliced = currentWord.slice(0, enteredWordLength);

  if (enteredWordLength <= currentWordLength) {
    if (enteredWord == currentWordSliced) {
      isWrong = false;
      isComplete = false;
      if (enteredWordLength == currentWordLength) {
        isComplete = true;
      }
    } else {
      isWrong = true;
      isComplete = false;
    }
  } else {
    isWrong = true;
    isComplete = false;
  }

  return { word: enteredWord, isWrong: isWrong, isComplete: isComplete };
}
