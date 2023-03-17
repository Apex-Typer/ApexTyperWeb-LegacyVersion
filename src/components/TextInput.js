import React, {useEffect, useRef,} from "react";
import styled from "styled-components";
import {useSelector, useDispatch} from "react-redux";
import {
    nextWord,
    prevWord,
    updateInput,
    resetInput,
    blurInput,
    updateCurrentWord,
    updateAndChangeCurrentWord,
    updateInputLog,
    switchTestOn,
    incrementErrorLog,
    decrementErrorLog,

} from "../state/action-creators/index";

function TextInput() {
    const currentWord = useSelector((state) => state.currentWord);
    const time = useSelector((state) => state.testTimer.time);
    const enteredWord = useSelector((state) => state.enteredWord);
    const inputLog = useSelector((state) => state.inputLog.log);
    const errorLog = useSelector((state) => state.inputLog.errors);
    const testWords = useSelector((state) => state.testWords);
    const testOn = useSelector((state) => state.testOn);
    const inputFocused = useSelector((state) => state.inputFocused);
    const dispatch = useDispatch();

    const inputRef = useRef(null);
    const testContentScrollerCount = useRef(0);

    useEffect(() => {
        if (currentWord.key > 0) {
            if (inputRef.current && document.activeElement != inputRef.current) {
                inputRef.current.focus();
            }
            let currentLineHeight = parseInt(
                window
                    .getComputedStyle(document.getElementById("TestContent"))
                    .getPropertyValue("line-height")
            );

            if (currentWord.top == 0) {
                testContentScrollerCount.current = 0;
                document.getElementById(
                    "TestContentChild"
                ).style.transform = `translateY(${currentLineHeight}px)`;
            } else if (
                currentWord.top -
                currentLineHeight * testContentScrollerCount.current !=
                0
            ) {
                testContentScroller();
            }

            if (currentWord.key <= inputLog.length && enteredWord.word == "") {
                dispatch(
                    updateInput(inputLog[currentWord.index].word, currentWord.word)
                );
                if (inputLog[currentWord.index].isWrong) {
                    dispatch(decrementErrorLog());
                }
                dispatch(updateInputLog(currentWord, enteredWord));
            }
        }
    }, [currentWord]);

    useEffect(() => {
        if (currentWord.key > 0) {
            dispatch(updateCurrentWord(currentWord, enteredWord));
        }
    }, [enteredWord]);

    useEffect(() => {
        if (enteredWord.isWrong) {
            dispatch(incrementErrorLog());
        }
    }, [enteredWord.isWrong]);

    function testContentScroller() {
        let currentLineHeight = parseInt(
            window
                .getComputedStyle(document.getElementById("TestContent"))
                .getPropertyValue("line-height")
        );

        let topOffsetFactor =
            (currentWord.top - currentLineHeight * testContentScrollerCount.current) /
            currentLineHeight;

        testContentScrollerCount.current =
            testContentScrollerCount.current + topOffsetFactor;

        document.getElementById("TestContentChild").style.transform = `translateY(${
            -1 *
            (currentLineHeight * testContentScrollerCount.current - currentLineHeight)
        }px)`;
    }

    function textInputChangeHandler(e) {
        // let enteredValue = String(e.target.value.replace(/\s/g, ""));
        let enteredValue = e.target.value;
        if (enteredValue.indexOf(" ") > 0) {
            dispatch(updateAndChangeCurrentWord(currentWord, enteredWord));
            dispatch(updateInputLog(currentWord, enteredWord));
            dispatch(nextWord(testWords.rawWords));
            dispatch(resetInput());
        } else if (enteredValue != " ") {
            dispatch(updateInput(enteredValue, currentWord.word));
            if (!testOn && currentWord.key == 1 && enteredValue != "" && time != 0) {
                dispatch(switchTestOn());
            }
        } else {
            resetInput();
        }
    }

    function keyDownHandler(e) {
        let keyClicked = e.nativeEvent.code;
        let enteredValue = String(e.target.value.replace(/\s/g, ""));

        if (
            keyClicked == "Backspace" &&
            enteredValue == "" &&
            currentWord.key > 1 &&
            !inputLog[currentWord.index - 1].isComplete
        ) {
            dispatch(updateAndChangeCurrentWord(currentWord, enteredWord));
            dispatch(prevWord(testWords.rawWords));
        }
    }

    return (
        <Container>
            <input
                ref={inputRef}
                id="textInput"
                autoFocus={true}
                autoCapitalize="off"
                autoComplete="off"
                spellCheck={false}
                maxLength="15"
                value={enteredWord.word}
                onKeyDown={(e) => keyDownHandler(e)}
                onChange={(e) => textInputChangeHandler(e)}
                onBlur={() => {
                    dispatch(blurInput());
                }}
            ></input>
        </Container>
    );
}

export default TextInput;

const Container = styled.div`
  width: 100%;
  position: absolute;

  input {
    background-color: transparent;
    border: none;
    cursor: default;
    border-bottom: "none";
    caret-color: transparent !important;
    font-size: 1.2em;
    font-family: "Quicksand", sans-serif;
    font-weight: 500;
    text-align: center;
    color: transparent;
    transition: all 150ms ease-in-out;

    &:focus {
      outline: none;
    }
  }
`;
