const reducer = (
  state = {
    key: 0,
    index: 0,
    htmlIndex: 0,
    id: "",
    word: "",
    width: 0,
    left: 0,
    top: 0,
  },
  action
) => {
  switch (action.type) {
    case "NEXT_WORD":
      return loadWord(state, action.payload.testWordsArray, "NEXT");
    case "CONFIRM_WORD":
      return loadWord(
        action.payload.currentWord,
        action.payload.testWordsArray,
        "CONFIRM"
      );
    case "PREVIOUS_WORD":
      return loadWord(state, action.payload.testWordsArray, "PREVIOUS");
    case "FIRST_WORD":
      return loadWord(state, action.payload.testWordsArray, "FIRST");
    case "RESET_WORD":
      return { key: 0, index: 0, id: "", word: "", width: 0, left: 0 };
    default:
      return state;
  }
};

export default reducer;

function loadWord(prevState, testWordsArray, type) {
  switch (type) {
    case "CONFIRM":
      return {
        key: prevState.key,
        index: prevState.index,
        htmlIndex: prevState.htmlIndex,
        id: prevState.id,
        word: prevState.word,
        width: document.getElementById(prevState.id).offsetWidth,
        left:
          document.getElementById(prevState.id).offsetLeft -
          document.getElementById(prevState.id).parentElement.offsetLeft,
        top:
          document.getElementById(prevState.id).offsetTop -
          document.getElementById(prevState.id).parentElement.offsetTop,
      };
    case "NEXT":
      return {
        key: prevState.key + 1,
        index: prevState.index + 1,
        htmlIndex: prevState.htmlIndex + 2,
        id: `word-${prevState.key + 1}`,
        word: testWordsArray[prevState.key],
        width: document.getElementById(`word-${prevState.key + 1}`).offsetWidth,
        left:
          document.getElementById(`word-${prevState.key + 1}`).offsetLeft -
          document.getElementById(`word-${prevState.key + 1}`).parentElement
            .offsetLeft,
        top:
          document.getElementById(`word-${prevState.key + 1}`).offsetTop -
          document.getElementById(`word-${prevState.key + 1}`).parentElement
            .offsetTop,
      };
    case "PREVIOUS":
      return {
        key: prevState.key - 1,
        index: prevState.index - 1,
        htmlIndex: prevState.htmlIndex - 2,
        id: `word-${prevState.key - 1}`,
        word: testWordsArray[prevState.key - 2],

        width: document.getElementById(`word-${prevState.key - 1}`).offsetWidth,
        left:
          document.getElementById(`word-${prevState.key - 1}`).offsetLeft -
          document.getElementById(`word-${prevState.key - 1}`).parentElement
            .offsetLeft,
        top:
          document.getElementById(`word-${prevState.key - 1}`).offsetTop -
          document.getElementById(`word-${prevState.key - 1}`).parentElement
            .offsetTop,
      };
    case "FIRST":
      return {
        key: 1,
        index: 0,
        htmlIndex: 0,
        id: "word-1",
        word: testWordsArray[0],
        width: document.getElementById("word-1").offsetWidth,
        left:
          document.getElementById("word-1").offsetLeft -
          document.getElementById("word-1").parentElement.offsetLeft,
        top:
          document.getElementById("word-1").offsetTop -
          document.getElementById("word-1").parentElement.offsetTop,
      };
    default:
      return prevState;
  }
}
