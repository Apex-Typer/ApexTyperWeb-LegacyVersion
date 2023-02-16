import React, { useEffect, useState, useRef, forwardRef } from "react";
import styled from "styled-components";
import words from "./wordsData";
import TextInput from "./TextInput";
import { Fade } from "react-reveal";
import { useSelector, useDispatch } from "react-redux";
import {
  newWords,
  evaluateWords,
  blurInput,
  focusInput,
  confirmWord,
  firstWord,
  resetWord,
  inactivateCurrentWord,
  resetInput,
  resetInputLog,
  resetTest,
  updateCurrentWord,
} from "../state/action-creators/index";

function Test() {
  const dispatch = useDispatch();
  const [wordsRendered, setWordsRendered] = useState(false);
  const testWords = useSelector((state) => state.testWords);
  const currentWord = useSelector((state) => state.currentWord);
  const inputFocused = useSelector((state) => state.inputFocused);
  const enteredWord = useSelector((state) => state.enteredWord);

  const testRef = useRef(null);

  function loadWords() {
    dispatch(newWords());
    setWordsRendered(true);
  }

  useEffect(() => {
    loadWords();
  }, []);

  useEffect(() => {
    if (currentWord.key != 0) {
      dispatch(confirmWord(currentWord));
    } else {
      if (wordsRendered) {
        dispatch(firstWord(testWords.rawWords));
        dispatch(focusInput());
        dispatch(resetInput());
        dispatch(resetInputLog());
      }
    }
  }, [testWords]);

  function handleClickOutside(e) {
    if (testRef.current && !testRef.current.contains(e.target)) {
      dispatch(blurInput());
    } else {
      dispatch(blurInput());
      dispatch(focusInput());
    }
  }

  function handleKeyDown(e) {
    if (
      !inputFocused &&
      !e.target.matches("#custom-time-input, #custom-time-input *")
    ) {
      dispatch(focusInput());
    }
    if (e.key == "Alt" && inputFocused) {
      dispatch(blurInput());
    }
    if (e.key == "Tab") {
      e.preventDefault();
    }
    if ((e.shiftKey || e.ctrlKey) && (e.code == "Enter" || e.keyCode == 32)) {
      resetTest(dispatch);
    }
  }

  function handleResize() {
    dispatch(blurInput());
    dispatch(focusInput());
  }

  useEffect(() => {
    if (!inputFocused && currentWord.key > 0) {
      dispatch(inactivateCurrentWord(currentWord, enteredWord));
      dispatch(confirmWord(currentWord));
    } else if (inputFocused && currentWord.key > 0) {
      updateCurrentWord(currentWord, enteredWord);
      // dispatch(confirmWord(currentWord));
    }
  }, [inputFocused]);

  useEffect(() => {
    // document.addEventListener("mousedown", handleClickOutside, true);
    // document.addEventListener("mouseup", handleClickOutside, true);
    // document.addEventListener("keydown", handleKeyDown, true);
    // window.addEventListener("resize", handleResize);
  }, [testRef]);

  return (
    <Container tabIndex={3}>
      {/* <Fade top duration={250}> */}
      {wordsRendered && inputFocused ? <TextInput /> : ""}
      <TestContent
        id="TestContent"
        className={!inputFocused ? "blur-content" : ""}
      >
        <Underline
          width={`${currentWord.width}px`}
          left={`${currentWord.left}px`}
          enteredWordIsWrong={enteredWord.isWrong}
          enteredWordIsComplete={enteredWord.isComplete}
        ></Underline>

        <div
          id="TestContentChild"
          onClick={() => dispatch(focusInput())}
          ref={testRef}
        >
          {testWords.forHtml}
        </div>
      </TestContent>
      {/* </Fade> */}
    </Container>
  );
}
export default Test;

const Container = styled.div`
  padding-top: 30px;
`;

const TestContent = styled.div`
  height: 120px;
  overflow: hidden;
  font-size: 1.3em;
  font-family: "Quicksand", sans-serif;
  font-weight: 500;
  line-height: 40px;
  /* text-align: justify;
  text-justify: distribute;
  text-align-last: left; */
  text-align: justify;
  hyphens: auto;
  -webkit-hyphens: auto;
  word-spacing: -0.05em;
  position: relative;
  #TestContentChild {
    transform: translateY(120px);
    transition: all 250ms ease-in-out;
  }
  .test-words {
    padding: 3px;
  }
  @media (max-width: 770px) {
    font-size: 1.2em;
    line-height: 30px;
    height: 90px;

    .test-words {
      padding: 1px;
    }
  }
`;

const Underline = styled.div.attrs((props) => ({
  style: {
    width: props.width,
    borderColor: props.enteredWordIsWrong
      ? "red"
      : props.enteredWordIsComplete
      ? "#00ffff99"
      : "#aaa",
  },
}))`
  position: absolute;
  z-index: 0;
  height: 76px;
  padding: 0;
  transform: translateX(${(props) => props.left});
  transition: all 150ms ease-in-out;
  border-bottom: 2px solid;
  @media (max-width: 770px) {
    height: 60px;
  }
`;
