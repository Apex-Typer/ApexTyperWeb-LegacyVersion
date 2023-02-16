import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <Container>
      <a href="mailto: contact@apextyper.com" className="footer-links">
        <img src="icons/email.png" alt="" className="icons" /> Mail
      </a>

      <a href="/" className="footer-links">
        <img src="icons/compare.png" alt="" className="icons" /> v2.0
      </a>

      <a
        href="https://www.instagram.com/apextyper/"
        target="_blank"
        className="footer-links"
      >
        <img src="icons/instagram.png" alt="" className="icons" /> Instagram
      </a>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  position: absolute;
  bottom: 20px;
  width: 80%;
  margin: auto;
  /* padding-bottom: 30px; */
  height: 40px;
  color: #575757;
  /* border:1px solid white; */

  display: flex;
  justify-content: space-between;
  align-items: center;

  .footer-links {
    font-size: 0.8em;
    color: #575757;

    display: flex;
    align-items: center;

    .icons {
      filter: invert(30%);
      width: 16px;
      margin-right: 3px;
    }
  }

  @media (max-width: 639px) {
    width: 90%;
  }

  @media (max-width: 430px) {
    font-size: 0.6em;

    .icons {
      width: 12px;
    }
  }
`;
