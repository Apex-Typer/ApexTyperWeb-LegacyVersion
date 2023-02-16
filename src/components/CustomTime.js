import React, { useEffect, useState, forwardRef, useRef } from "react";
import styled from "styled-components";
import { Fade } from "react-reveal";
import HeadShake from "react-reveal/HeadShake";
import { useDispatch, useSelector } from "react-redux";
import {
  closeTimeInput,
  updateTestTimer,
  closeTimeMenu,
} from "../state/action-creators";

function CustomTime() {
  // states and state managers

  const timeInputContainer = useRef(null);

  const time = useSelector((state) => state.testTimer.time);
  const timeForDisplay = useSelector((state) => state.testTimer.forDisplay);
  const [customTime, setTime] = useState({
    minutes: parseInt(timeForDisplay.minutes),
    seconds: parseInt(timeForDisplay.seconds),
  });

  const dispatch = useDispatch();

  const [MinuteInputError, setMinuteInputError] = useState(false);
  const [SecondInputError, setSecondInputError] = useState(false);

  if (MinuteInputError || SecondInputError) {
    setTimeout(() => {
      setMinuteInputError(false);
      setSecondInputError(false);
    }, 100);
  }

  // to ensure second's input stays zero when minutes is set to 60

  useEffect(() => {
    if (customTime.minutes == 60 && customTime.seconds > 0) {
      setTime((prevTime) => ({ ...prevTime, seconds: 0 }));
      inputError("seconds");
    }
  }, [customTime]);
  useEffect(() => {
    if (timeInputContainer.current) {
      timeInputContainer.current.focus();
    }
  }, [customTime]);

  // event handlers

  function inputError(t) {
    switch (t) {
      case "minutes":
        setMinuteInputError(true);
        break;
      case "seconds":
        setSecondInputError(true);
        break;
      default:
        break;
    }
  }

  function valueController(m, l, v, t) {
    let r;
    if (v >= m && v <= l) {
      r = v;
    } else if (v > l) {
      if (t == "seconds") {
        r = m;
        inputError(t);
        timeUpdate(
          { target: { value: customTime.minutes + 1 } },
          "minutes",
          "custom"
        );
      } else {
        r = l;
        inputError(t);
      }
    } else if (v < m) {
      r = m;
      inputError(t);
    } else {
      r = 0;
    }
    return r;
  }

  function timeUpdate(e, t, c) {
    switch (c) {
      case "custom":
        setTime((prevTime) => ({
          ...prevTime,
          [t]: valueController(0, 60, parseInt(e.target.value), t),
        }));
        break;
      case "increment":
        setTime((prevTime) => ({
          ...prevTime,
          [t]: valueController(0, 60, parseInt(prevTime[t]) + 1, t),
        }));
        break;
      case "decrement":
        setTime((prevTime) => ({
          ...prevTime,
          [t]: valueController(0, 60, parseInt(prevTime[t]) - 1, t),
        }));
        break;
      case "reset":
        setTime((prevTime) => ({ ...prevTime, [t]: "" }));
        break;
      case "fill":
        setTime((prevTime) => ({ ...prevTime, [t]: 0 }));
        break;
      default:
        break;
    }
  }

  function keyDownHandler(event) {
    switch (event.key) {
      case "Escape":
        dispatch(closeTimeInput());
        break;
      case "Enter":
        dispatch(
          updateTestTimer(
            parseInt(customTime["minutes"] * 60) +
              parseInt(customTime["seconds"])
          )
        );
        dispatch(closeTimeInput());
        dispatch(closeTimeMenu());
        break;
      default:
        break;
    }
  }
  return (
    <Container
      ref={timeInputContainer}
      tabIndex="2"
      onKeyDown={(event) => {
        keyDownHandler(event);
      }}
    >
      <Fade bottom duration={250}>
        <TimeInput id="CustomTimeInput">
          <CloseTimeInput
            src="icons/close.png"
            className="cyan-icon"
            onClick={() => dispatch(closeTimeInput())}
          />

          <TimeInputFixedOptions1>
            <TimeOptions
              onClick={() => {
                timeUpdate({ target: { value: 0 } }, "minutes", "custom");
                timeUpdate({ target: { value: 0 } }, "seconds", "custom");
              }}
              className={time == 0 ? "selected-time-option" : ""}
            >
              0s
            </TimeOptions>

            <TimeOptions
              onClick={() => {
                timeUpdate({ target: { value: 0 } }, "minutes", "custom");
                timeUpdate({ target: { value: 30 } }, "seconds", "custom");
              }}
              className={time == 30 ? "selected-time-option" : ""}
            >
              30s
            </TimeOptions>

            <TimeOptions
              onClick={() => {
                timeUpdate({ target: { value: 0 } }, "minutes", "custom");
                timeUpdate({ target: { value: 60 } }, "seconds", "custom");
              }}
              className={time == 60 ? "selected-time-option" : ""}
            >
              60s
            </TimeOptions>
          </TimeInputFixedOptions1>

          <TimeInputUI>
            <MinuteBlock>
              <img
                src="/icons/up-arrow.png"
                className="grey-icon arrow-icon"
                alt=""
                onClick={(event) => timeUpdate(event, "minutes", "increment")}
              />

              <HeadShake when={MinuteInputError} duration={400}>
                <MinuteInput
                  type="number"
                  value={customTime.minutes}
                  onFocus={(event) => {
                    timeUpdate(event, "minutes", "reset");
                  }}
                  onBlur={
                    customTime.minutes === null
                      ? (event) => timeUpdate(event, "minutes", "fill")
                      : (event) => timeUpdate(event, "minutes", "custom")
                  }
                  onChange={(event) => {
                    timeUpdate(event, "minutes", "custom");
                  }}
                />
              </HeadShake>

              <img
                src="/icons/down-arrow.png"
                className="grey-icon arrow-icon"
                alt=""
                onClick={(event) => timeUpdate(event, "minutes", "decrement")}
              />
            </MinuteBlock>

            <span>m</span>
            <span className="time-input-divider">:</span>

            <SecondBlock>
              <img
                src="/icons/up-arrow.png"
                className="grey-icon arrow-icon"
                alt=""
                onClick={(event) => timeUpdate(event, "seconds", "increment")}
              />

              <HeadShake when={SecondInputError} duration={400}>
                <SecondInput
                  type="number"
                  value={customTime.seconds}
                  onFocus={(event) => timeUpdate(event, "seconds", "reset")}
                  onBlur={
                    customTime.seconds
                      ? (event) => timeUpdate(event, "seconds", "custom")
                      : (event) => timeUpdate(event, "seconds", "fill")
                  }
                  onChange={(event) => timeUpdate(event, "seconds", "custom")}
                />
              </HeadShake>

              <img
                src="/icons/down-arrow.png"
                className="grey-icon arrow-icon"
                alt=""
                onClick={(event) => timeUpdate(event, "seconds", "decrement")}
              />
            </SecondBlock>

            <span>s</span>
          </TimeInputUI>

          <TimeInputFixedOptions2>
            <TimeOptions
              onClick={() => {
                timeUpdate(
                  { target: { value: customTime.seconds - 5 } },
                  "seconds",
                  "custom"
                );
              }}
            >
              -5s
            </TimeOptions>
            <TimeOptions
              onClick={() => {
                timeUpdate(
                  { target: { value: customTime.seconds + 5 } },
                  "seconds",
                  "custom"
                );
              }}
            >
              +5s
            </TimeOptions>
          </TimeInputFixedOptions2>
          <Uploadtime
            onClick={() => {
              dispatch(
                updateTestTimer(
                  parseInt(customTime["minutes"] * 60) +
                    parseInt(customTime["seconds"])
                )
              );
              dispatch(closeTimeInput());
              dispatch(closeTimeMenu());
            }}
          >
            OK
          </Uploadtime>
        </TimeInput>
      </Fade>
    </Container>
  );
}

export default CustomTime;

// styles

const Container = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 3;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  backdrop-filter: blur(3px);
  transition: all 250ms ease-in-out;

  &:focus {
    outline: none;
  }
`;

const TimeInputFixedOptions1 = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  border-bottom: 1px solid rgba(170, 170, 170, 0.2);
  border-top: 1px solid rgba(170, 170, 170, 0.2);
  margin-top: 10px;
  p {
    cursor: pointer;
    /* margin: 10px 0 10px; */
    margin: 5px 0;
  }
  .selected-time-option {
    color: cyan;
  }
  @media (max-width: 430px) {
    p {
      font-size: 0.8em;
    }
  }
`;

const TimeInputFixedOptions2 = styled(TimeInputFixedOptions1)`
  margin-top: 0;
  justify-content: space-evenly;
`

const TimeOptions = styled.p`
`;

const TimeInput = styled.div`
  position: relative;
  background-color: #17171a;
  max-width: 50vw;
  width: 300px;
  padding: 10px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  box-shadow: -1px 10px 23px 0px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: -1px 10px 23px 0px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -1px 10px 23px 0px rgba(0, 0, 0, 0.51);
`;

const CloseTimeInput = styled.img`
  width: 12px;
  margin-left: auto;
  cursor: pointer;
  padding: 5px;
`;
const TimeInputUI = styled.div`
  width: 100%;
  padding: 10px 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 0 0 10px;
    font-size: 1.5em;
  }

  .arrow-icon {
    width: 22px;
  }

  .time-input-divider {
    margin: 0 10px;
    color: #00ffff99;
    font-size: 1.5em;
  }

  img {
    cursor: pointer;
  }

  input {
    background-color: transparent;
    border: none;
    color: #aaaaaa;
    font-size: 1.5em;
    text-align: center;
    width: 2ch;
  }
  input:focus {
    outline: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  @media (max-width: 430px) {
    span {
      font-size: 1em;
    }
    input {
      font-size: 1em;
    }
    .arrow-icon {
      width: 18px;
    }
  }
`;
const MinuteBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MinuteInput = styled.input``;

const SecondBlock = styled(MinuteBlock)``;

const SecondInput = styled(MinuteInput)``;

const Uploadtime = styled.p`
  left: auto;
  opacity: 0.75;
  color: cyan;
  cursor: pointer;
  margin: 10px 0px;
  @media (max-width: 430px) {
    margin: 10px;
  }
`;
