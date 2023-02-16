import { combineReducers } from "redux";
import testOn from "./testOn";
import currentWord from "./currentWord";
import enteredWord from "./enteredWord";
import testWords from "./testWords";
import inputFocused from "./inputFocused";
import inputLog from "./inputLog";
import testTimer from "./testTimer";
import controlsStates from "./controlsStates";
import showResult from "./showResult";
import dialogFlags from "./dialogFlags";

const reducers = combineReducers({
  testOn,
  currentWord,
  enteredWord,
  testWords,
  inputFocused,
  inputLog,
  testTimer,
  controlsStates,
  showResult,
  dialogFlags,
});

export default reducers;
