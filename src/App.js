import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import styled from "styled-components";
import Settings from "./components/Settings";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  blurInput,
  closeTimeInput,
  closeTimeMenu,
  focusInput,
  resetTest,
  showTimeInput,
  switchCapsLockOn,
  switchCapsLockOff,
} from "./state/action-creators";

function App() {
  const dispatch = useDispatch();

  const windowWidth = useRef(window.innerWidth);

  const showResult = useSelector((state) => state.showResult);

  const inputFocused = useSelector((state) => state.inputFocused);

  const timeInput = useSelector((state) => state.controlsStates.timeInput);
  const timeMenu = useSelector((state) => state.controlsStates.timeMenu);

  function handleClickOutside(event) {
    // if (
    //   document.getElementById("TestContentChild") &&
    //   document.getElementById("TestContentChild").contains(event.target)
    // ) {
    //   // if (!inputFocused) {
    //   //   dispatch(focusInput());
    //   // } else {
    //   //   dispatch(blurInput());
    //   //   dispatch(focusInput);
    //   // }
    // } else
    if (
      document.getElementById("TestContentChild") &&
      !document.getElementById("TestContentChild").contains(event.target) &&
      inputFocused
    ) {
      dispatch(blurInput());
    }
    if (
      document.getElementById("TimeControls") &&
      !document.getElementById("TimeControls").contains(event.target) &&
      (timeInput || timeMenu)
    ) {
      dispatch(closeTimeMenu());
      if (
        document.getElementById("CustomTimeInput") &&
        !document.getElementById("CustomTimeInput").contains(event.target)
      ) {
        dispatch(closeTimeInput());
      }
    }
    document.getElementById("App").focus();
  }

  function handleKeyDown(event) {
    event.stopPropagation();
    if (!showResult) {
      if (!inputFocused) {
        event.preventDefault();
        dispatch(focusInput());
        if (timeMenu) {
          dispatch(closeTimeMenu());
        }
      }
      if (event.key == "Alt" && inputFocused) {
        dispatch(blurInput());
      }
    }
    if (event.key == "Tab" || event.key == "Alt") {
      event.preventDefault();
    }
    if (
      (event.shiftKey || event.ctrlKey) &&
      (event.code == "Enter" || event.keyCode == 32)
    ) {
      resetTest(dispatch);
    }

    if (event.ctrlKey && event.code == "Slash") {
      dispatch(showTimeInput());
    }
    if (event.getModifierState("CapsLock")) {
      dispatch(switchCapsLockOn());
    } else {
      dispatch(switchCapsLockOff());
    }
    // console.log(event);
  }

  function handleResize() {
    if (window.innerWidth != windowWidth.current) {
      dispatch(blurInput());
      dispatch(focusInput());
      windowWidth.current = window.innerWidth;
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("focus", () =>
      document.getElementById("App").focus()
    );
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      tabIndex={1}
      onClick={(event) => handleClickOutside(event)}
      onKeyDown={(event) => handleKeyDown(event)}
      id="App"
    >
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/settings" element={<Settings />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;

const Container = styled.div`
  /* position: relative; */
  background-color: #1b1b1e;
  color: #aaaaaa;
  overflow-x: hidden;
  padding: 0 10%;
  @media (max-width: 639px) {
    padding: 0 5%;
    min-height: calc(100vh- 180px);
  }

  &:focus {
    outline: none;
  }
`;
