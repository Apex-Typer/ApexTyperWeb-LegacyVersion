import words from "../../components/wordsData";

const reducer = (state = { forHtml: [], rawWords: [] }, action) => {
  switch (action.type) {
    case "NEW_WORDS":
      return testWordsLoader();
    case "UPDATE_CURRENT_WORD":
      return {
        forHtml: updateCurrentWord(
          state.forHtml,
          action.payload.currentWord,
          action.payload.enteredWord,
          action.payload.blinkCurrentLetter,
          action.payload.wordChanged
        ),
        rawWords: state.rawWords,
      };
    default:
      return state;
  }
};

export default reducer;

function testWordsLoader() {
  let j = 500;
  let wordsArrayHtml = [];
  let wordsArray = [];
  let prevRanNum = 0;
  for (let i = 0; i < j; i++) {
    var r = Math.floor(Math.random() * words.length);
    if (r == prevRanNum) {
      r++;
    }
    prevRanNum = r;
    const word = words[r];
    let letterArray = [];
    for (let l = 0; l < word.length; l++) {
      letterArray.push(
        <span
          key={`word-${i + 1}-letter-${l + 1}`}
          id={`word-${i + 1}-letter-${l + 1}`}
          className={`letter${i == 0 && l == 0 ? " current-letter" : ""}`}
        >
          {word[l]}
        </span>
      );
    }
    wordsArrayHtml.push(
      <span
        className={`test-words${i == 0 ? " current-word" : ""}`}
        id={`word-${i + 1}`}
        key={`word-${i + 1}`}
      >
        {letterArray}
      </span>
    );
    wordsArrayHtml.push(" ");
    wordsArray.push(word);
  }
  return { forHtml: wordsArrayHtml, rawWords: wordsArray };
}

function updateCurrentWord(
  prevTestWords,
  currentWord,
  enteredWord,
  blinkCurrentLetter,
  wordChanged
) {
  let updatedWordList = [];
  let currentWordIndex = currentWord.htmlIndex;

  let enteredWordLength = enteredWord.word.length;
  let currentWordLength = currentWord.word.length;

  let letterArray = [];
  let updatedWord;

  if (currentWordLength >= enteredWordLength) {
    for (let l = 0; l < currentWordLength; l++) {
      letterArray.push(
        <span
          key={`word-${currentWord.key}-letter-${l + 1}`}
          id={`word-${currentWord.key}-letter-${l + 1}`}
          className={`letter ${classAssigner(
            currentWord.word[l],
            enteredWord.word[l],
            currentWordLength,
            enteredWordLength,
            l,
            enteredWord.isWrong,
            blinkCurrentLetter,
            wordChanged,
            enteredWord.word == ""
          )}`}
        >
          {currentWord.word[l]}
        </span>
      );
    }
  } else {
    for (let l = 0; l < enteredWordLength; l++) {
      letterArray.push(
        <span
          key={`word-${currentWord.key}-letter-${l + 1}`}
          id={`word-${currentWord.key}-letter-${l + 1}`}
          className={`letter ${
            l + 1 <= enteredWordLength
              ? currentWord.word[l] == enteredWord.word[l]
                ? enteredWord.isWrong
                  ? "custom-dark-yellow"
                  : "custom-dark-cyan"
                : "custom-dark-red"
              : ""
          }`}
        >
          {l + 1 <= currentWordLength
            ? currentWord.word[l]
            : enteredWord.word[l]}
        </span>
      );
    }
  }
  updatedWord = (
    <span className={"test-words"} id={currentWord.id} key={currentWord.id}>
      {letterArray}
    </span>
  );

  updatedWordList = [...prevTestWords];
  updatedWordList[currentWordIndex] = updatedWord;
  return updatedWordList;
}

function classAssigner(
  currentLetter,
  enteredLetter,
  currentWordLength,
  enteredWordLength,
  currentLetterIndex,
  enteredWordIsWrong,
  blinkCurrentLetter,
  wordChanged,
  enteredWordIsEmpty
) {
  let classVal = "letter ";

  if (enteredWordLength >= currentLetterIndex + 1) {
    if (currentLetter == enteredLetter) {
      if (
        enteredWordIsWrong ||
        (wordChanged && enteredWordLength < currentWordLength)
      ) {
        classVal += "custom-dark-yellow";
      } else {
        classVal += "custom-dark-cyan";
      }
    } else {
      classVal += "custom-dark-red";
    }
  } else if (enteredWordLength == currentLetterIndex && blinkCurrentLetter) {
    classVal += "current-letter";
  } else if (wordChanged && !enteredWordIsEmpty) {
    classVal += "custom-dark-grey";
  }
  return classVal;
}
