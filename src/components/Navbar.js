import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

function Navbar() {
  return (
    <Container>
      <NavLink to="/" className="brand-name">
        <ApexTitle>APEX</ApexTitle>_typer
      </NavLink>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <NavLink to="settings">
              <SettingsIcon
                className="icons grey-icon"
                src="/icons/settings.png"
              />
            </NavLink>
          }
        />

        <Route
          exact
          path="/settings"
          element={
            <NavLink to="/">
              <CloseIcon className="icons grey-icon" src="icons/close.png" />
            </NavLink>
          }
        />
      </Routes>
    </Container>
  );
}

export default Navbar;

const Container = styled.div`
  width: 100%;
  padding: 20px 0;

  display: flex;
  justify-content: space-between;

  .brand-name {
    font-size: 2em;
  }

  @media (max-width: 430px) {
    .brand-name {
      font-size: 1.5em;
    }

    .icons {
      margin-top: 13px;
      width: 18px;
      height: 18px;
    }
  }

  @media (max-width: 325px) {
    .brand-name {
      font-size: 1em;
    }

    .icons {
      margin-top: 5px;
    }
  }
`;

const ApexTitle = styled.span`
  color: #00ffff;
`;

const SettingsIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-top: 20px;
`;

const CloseIcon = styled(SettingsIcon)``;
