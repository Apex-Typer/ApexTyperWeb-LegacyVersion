import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Controls from "./Controls";
import Test from "./Test";
import TestResult from "./TestResult";
import { BrowserView } from "react-device-detect";

function Home() {
  const showResult = useSelector((state) => state.showResult);
  const testOn = useSelector((state) => state.testOn);
  const inputFocused = useSelector((state) => state.inputFocused);
  const capsLock = useSelector((state) => state.dialogFlags.capsLock);
  const bodyHeight = document.documentElement.scrollHeight;

  return (
    <Container id="HomeSection" bodyHeight={bodyHeight}>
      <Controls />
      {showResult ? <TestResult /> : <Test />}
      <DialogBoxForFocus
        testOn={testOn}
        inputFocused={inputFocused}
        showResult={showResult}
      >
        click on the text or press any key to focus
      </DialogBoxForFocus>
      <DialogBoxForStart
        testOn={testOn}
        inputFocused={inputFocused}
        showResult={showResult}
      >
        start the test by typing the first word
      </DialogBoxForStart>
      <DialogBoxForCapsLock capsLock={capsLock}>Caps Lock</DialogBoxForCapsLock>
      <BrowserView>
        <DialogBoxForRestart
          testOn={testOn}
          inputFocused={inputFocused}
          showResult={showResult}
        >
          shift/ctrl + space/enter - restart
        </DialogBoxForRestart>
      </BrowserView>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  /* min-height: calc(100vh - 140px); */
  min-height: ${(props) => props.bodyHeight - 140}px;
  position: relative;
  /* border: 1px solid white; */
  /* 
  @media (max-width: 639px) {
    min-height: calc(100vh - 180px);
  } */

  &:focus {
    outline: none;
  }
`;

const DialogBoxMain = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  /* padding: 30px 0 0; */
  bottom: 30px;
  /* border: 1px solid; */
  justify-content: center;
  /* color: ${(props) =>
    props.testOn && props.inputFocused && !props.showResult
      ? "transparent"
      : "rgba(255, 255, 255, 0.15)"}; */
  color: rgba(255, 255, 255, 0.15);
  font-size: 1rem;
  transition: color 200ms ease-in-out;
`;

const DialogBoxForCapsLock = styled(DialogBoxMain)`
  width: fit-content;
  margin: auto;
  position: relative;
  top:  10px;
  color: ${(props) =>
    props.capsLock ? "rgba(255, 162, 0, 0.3)" : "transparent"};
`;

const DialogBoxForRestart = styled(DialogBoxMain)``;

const DialogBoxForFocus = styled(DialogBoxMain)`
  position: relative;
  color: ${(props) =>
    !props.inputFocused && !props.showResult
      ? "rgba(255, 255, 255, 0.15)"
      : "transparent"};
  /* bottom: 170px; */
  top: 20px;
`;

const DialogBoxForStart = styled(DialogBoxForFocus)`
  color: ${(props) =>
    props.inputFocused && !props.testOn
      ? "rgba(255, 255, 255, 0.15)"
      : "transparent"};
  top: 0px;
`;
