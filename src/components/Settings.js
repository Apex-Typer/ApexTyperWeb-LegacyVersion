import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { styled as styledMUI } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import withReveal from "react-reveal/withReveal";
import Fade from "react-reveal/Fade";
import Pulse from "react-reveal/Pulse";
import { Switch } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import {
  resetInput,
  resetLiveTime,
  resetTest,
  resetWord,
} from "../state/action-creators";
import { useDispatch } from "react-redux";

function Settings() {
  const dispatch = useDispatch();
  useEffect(() => {
    resetTest(dispatch);
  }, []);

  const settingsData = { backSpaceOn: true };

  function optionClickHandler(option, setOption, item, value) {
    setOption(value);
    localStorage.setItem(item, value);
  }

  return (
    <Container>
      {/* <SettingsBlock>
        <MainSettingsBlockChild>
          <MainHeading>BackSpace</MainHeading>
          <SettingsToggleOption>
            {settingsData.backSpaceOn ? "enabled" : "disabled"}
          </SettingsToggleOption>
          <FormControlLabel control={<Android12Switch defaultChecked />} />

          <Switch />
        </MainSettingsBlockChild>
      </SettingsBlock> */}
      This feature is under-development, stay tuned for the next update to
      experience some really good user customisability ;)
    </Container>
  );
}

export default Settings;

const Android12Switch = styledMUI(Switch)(({ theme }) => ({
  padding: 8,
  marginLeft: "35%",

  "& .MuiSwitch-root": {
    marginLeft: 20,
    left: 20,
  },

  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    border: "1px solid #aaa",
    backgroundColor: "#1b1b1e",
    boxSizing: "border-box",
  },

  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#c9c9c9",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#aaa",
  },

  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 200px);
  padding-top: 50px;

  position: relative;

  @media (max-width: 639px) {
    min-height: calc(100vh - 230px);
    font-size: 1rem;
  }

  /* temorary style for dialog */
  text-align: center;
  color: rgba(255, 255, 255, 0.2);
  font-size: 1.1rem;
`;
const SettingsBlock = styled.div`
  /* border: 1px solid rgba(170, 170, 170, 0.3); */
  border-radius: 4px;
  box-shadow: -1px 10px 23px 0px rgba(0, 0, 0, 0.51);
  -webkit-box-shadow: -1px 10px 23px 0px rgba(0, 0, 0, 0.51);
  -moz-box-shadow: -1px 10px 23px 0px rgba(0, 0, 0, 0.51);
  padding: 10px;
  box-sizing: border-box;
  max-width: 300px;
  /* height: 300px; */
  background-color: #17171a;
  transition: height 1s ease-in-out;
`;

const MainSettingsBlockChild = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

const MainHeading = styled.span`
  font-size: 1.8rem;
  border-bottom: 1px solid cyan;
  box-sizing: border-box;
`;

const SettingsToggleOption = styled.span`
  box-sizing: border-box;
  border: 1px solid rgba(170, 170, 170, 0.3);
  padding: 0px 3px;
  color: #1b1b1b;
  background-color: rgba(170, 170, 170, 0.7);
  border-radius: 0%;
`;
