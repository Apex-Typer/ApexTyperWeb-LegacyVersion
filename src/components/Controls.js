import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Slide, Fade } from "react-reveal";
import CustomTime from "./CustomTime";
import { useDispatch, useSelector } from "react-redux";
import {
  showTimeInput,
  closeTimeInput,
  showTimeMenu,
  closeTimeMenu,
  resetLiveTime,
  updateTestTimer,
  resetTest,
  decrementLiveTime,
  enableShowResult,
} from "../state/action-creators";

function Controls() {
  // states and state managers

  const timeMenuRef = useRef(null);
  const timerFunction = useRef(null);

  const testOn = useSelector((state) => state.testOn);
  const showResult = useSelector((state) => state.showResult);
  const time = useSelector((state) => state.testTimer.time);
  const liveTime = useSelector((state) => state.testTimer.liveTime);
  const timeForDisplay = useSelector((state) => state.testTimer.forDisplay);

  const dispatch = useDispatch();

  const timeInput = useSelector((state) => state.controlsStates.timeInput);
  const timeMenu = useSelector((state) => state.controlsStates.timeMenu);

  function timerSettingsClick() {
    if (timeMenu) {
      dispatch(closeTimeMenu());
    } else {
      dispatch(showTimeMenu());
    }
  }

  function timeOptionClickHandler(value) {
    dispatch(updateTestTimer(value));
    dispatch(resetLiveTime());
    dispatch(closeTimeMenu());
    if (timeInput) {
      dispatch(closeTimeInput());
    }
  }

  function restartOnClick() {
    resetTest(dispatch);
  }

  useEffect(() => {
    clearInterval(timerFunction.current);
  }, []);

  useEffect(() => {
    if (liveTime == 0 && testOn) {
      // resetTest(dispatch);
      clearInterval(timerFunction.current);
      dispatch(enableShowResult());
    }
  }, []);

  useEffect(() => {
    if (testOn) {
      timerFunction.current = setInterval(function () {
        dispatch(decrementLiveTime());
      }, 1000);
    } else {
      clearInterval(timerFunction.current);
    }
  }, [testOn]);

  return (
    <Container>
      <Fade left duration={250}>
        <Time>
          {testOn && !showResult && time > 0 ? (
            <p id="time-view">
              {time <= 60
                ? `${liveTime}s`
                : `${timeForDisplay.minutes}:${timeForDisplay.seconds}`}
            </p>
          ) : (
            <TimeControls id="TimeControls">
              <TimeSettings
                src="icons/timer_settings.png"
                className="time-icons grey-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  timerSettingsClick(event);
                }}
              />

              <TimeSettingsMenuWrap>
                <Slide
                  duration={300}
                  delay={timeMenu ? 100 : 0}
                  left
                  when={timeMenu}
                  className="time-settings-menu"
                >
                  <TimeSettingsMenu className={!timeMenu && "display-none"}>
                    <Time0
                      onClick={() => timeOptionClickHandler(0)}
                      className={time == 0 ? "selected-time-option" : ""}
                    >
                      0s
                    </Time0>

                    <Time30
                      onClick={() => timeOptionClickHandler(30)}
                      className={time == 30 ? "selected-time-option" : ""}
                    >
                      30s
                    </Time30>

                    <Time60
                      onClick={() => timeOptionClickHandler(60)}
                      className={time == 60 ? "selected-time-option" : ""}
                    >
                      60s
                    </Time60>

                    <TimeCustom
                      src="icons/time_input.png"
                      onClick={() => dispatch(showTimeInput())}
                      className={
                        time != 0 && time != 30 && time != 60
                          ? "cyan-icon"
                          : "grey-icon"
                      }
                    />
                  </TimeSettingsMenu>
                </Slide>
              </TimeSettingsMenuWrap>

              <CurrentTimeWrap>
                <Slide
                  duration={!timeMenu ? 250 : 100}
                  delay={!timeMenu ? 300 : 0}
                  left
                  when={!timeMenu}
                >
                  <CurrentTime
                    className={timeMenu && "display-none"}
                    duration={!timeMenu ? 250 : 100}
                    delay={!timeMenu ? 300 : 0}
                    left={!timeMenu}
                    timeMenu={timeMenu}
                    onClick={() => dispatch(showTimeInput())}
                  >
                    {time <= 60
                      ? `${time}s`
                      : `${timeForDisplay.minutes}:${timeForDisplay.seconds}`}
                  </CurrentTime>
                </Slide>
              </CurrentTimeWrap>
            </TimeControls>
          )}
        </Time>
      </Fade>

      <Fade right duration={250}>
        <Restart
          src="icons/restart.png"
          className="grey-icon"
          id="restartTest"
          onClick={() => restartOnClick()}
        />
      </Fade>

      {timeInput && <CustomTime />}
    </Container>
  );
}

export default Controls;

// controls

const Container = styled.div`
  padding-top: 35px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  #time-view {
    margin: 0;
    color: cyan;
  }

  .time-icons {
    width: 22px;
    height: 22px;
  }

  @media (max-width: 430px) {
    padding-top: 15px;
    font-size: 0.75em;

    .time-icons {
      width: 18px;
      height: 18px;
    }
  }
`;

const Time = styled.div`
  display: flex;
  align-items: center;
`;

const TimeControls = styled.div`
  display: flex;
  align-items: center;

  position: relative;
`;

const TimeSettings = styled.img`
  cursor: pointer;
`;

const TimeSettingsMenuWrap = styled.div`
  position: absolute;
  left: 27px;
  z-index: 2;
  background-color: transparent;

  overflow: hidden;

  display: flex;

  * {
    background-color: transparent;
  }
`;

const CurrentTimeWrap = styled(TimeSettingsMenuWrap)`
  cursor: pointer;
`;

const TimeSettingsMenu = styled.div`
  display: flex;
  align-items: center;

  * {
    margin: 0 5px;
    cursor: pointer;
  }

  .selected-time-option {
    color: cyan;
  }
`;

const TimeCustom = styled.img`
  width: 19px;
  height: 19px;

  @media (max-width: 430px) {
    width: 15px;
    height: 15px;
  }
`;

const CurrentTime = styled.div`
  border-bottom: 1px solid cyan;
  box-sizing: border-box;
  margin-bottom: 5px;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Restart = styled.img`
  width: 24px;
  cursor: pointer;

  @media (max-width: 430px) {
    width: 20px;
  }
`;

const Time30 = styled.p``;

const Time60 = styled.p``;

const Time0 = styled.p``;
