import React, {useState, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components";

function TestResult() {
    const inputLog = useSelector((state) => state.inputLog);

    const time = useSelector((state) => state.testTimer.time);
    const timeMultiplier = 60 / time;
    const totalWords = inputLog.log.length;
    const completedWords = useSelector((state) =>
        state.testWords.rawWords.slice(0, totalWords)
    );
    const totalLetters = completedWords.join("").length;
    const totalWrongWords = inputLog.wrongWords;
    const totalCorrectWords = totalWords - totalWrongWords;
    const totalErrors = inputLog.errors;

    const accuracy = Math.max(
        0,
        Math.round((1 - (totalErrors + totalWrongWords) / totalLetters) * 100)
    );
    const wpm = Math.round(totalCorrectWords * timeMultiplier);

    const evaluateAndSetHighScore = () => {
        const highScore = JSON.parse(localStorage.getItem("highScore"))
        if (highScore) {
            if (wpm > highScore) {
                localStorage.setItem("highScore", JSON.stringify(wpm))
            }
        } else if (wpm > 0) {
            localStorage.setItem("highScore", JSON.stringify(wpm))
        }
    }

    function resultReveal(element) {
        const counters = document.querySelectorAll(element);
        const speed = 100;

        counters.forEach((counter) => {
            const animate = () => {
                const value = +counter.getAttribute("result");
                const data = +counter.innerText;

                const time = value / speed;
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    // setTimeout(animate, 20 * (data / value));
                    setTimeout(animate, 1 * (value / data));
                } else {
                    counter.innerText = value;
                }
            };

            animate();
        });
    }

    useEffect(() => {
        resultReveal(".result-num");
        evaluateAndSetHighScore()
        document.getElementById("App").focus();
    }, []);

    return (
        <Container tabIndex={3}>
            {wpm > 0 && accuracy > 0 ? (
                <ValidResult>
                    <span>
                        <p className="result-num" result={wpm}>
                            0
                        </p>
                            _wpm
                        </span>
                    <span>
                        <p className="result-num" result={accuracy}>
                            0
                        </p>
                            %_accuracy
                    </span>
                </ValidResult>
            ) : (
                <InvalidResult>
                    The test was invalid, try again!
                </InvalidResult>

            )}
            {localStorage.getItem("highScore") && <span
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "2rem",
                    color: "rgba(255, 255, 255, 0.4)"
                }}>
                        highscore
                        <p style={{fontSize: "2.2rem", color: "#aaa", marginLeft: "1rem"}}>
                            {localStorage.getItem("highScore")}
                        </p>
                            _wpm
                    </span>}

        </Container>
    );
}

export default TestResult;

const Container = styled.div`
`;

const ValidResult = styled.div`
  display: flex;
  flex-wrap: wrap;

  p {
    font-size: 3rem;
    color: cyan;
    margin: 0;
    /* width: 3.8rem; */
  }

  span {
    margin-top: 20px;
    font-size: 2rem;
    color: #aaa;
    display: flex;
    align-items: baseline;
    margin-right: 60px;
  }
`;

const InvalidResult = styled.span`
  display: flex;
  margin-top: 50px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.5rem;
`;
