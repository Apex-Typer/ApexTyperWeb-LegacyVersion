export const firstWord = (testWordsArray) => {
    return {type: "FIRST_WORD", payload: {testWordsArray}};
};
export const confirmWord = (currentWord, testWordsArray) => {
    return {type: "CONFIRM_WORD", payload: {currentWord, testWordsArray}};
};

export const resetWord = () => {
    return {type: "RESET_WORD"};
};

export const nextWord = (testWordsArray) => {
    return {type: "NEXT_WORD", payload: {testWordsArray}};
};

export const prevWord = (testWordsArray) => {
    return {type: "PREVIOUS_WORD", payload: {testWordsArray}};
};

export const updateInput = (enteredWord, currentWord) => {
    return {type: "UPDATE_INPUT", payload: {enteredWord, currentWord}};
};

export const resetInput = () => {
    return {type: "RESET_INPUT", payload: ""};
};

export const newWords = () => {
    return {type: "NEW_WORDS"};
};

export const updateCurrentWord = (currentWord, enteredWord) => {
    return {
        type: "UPDATE_CURRENT_WORD",
        payload: {
            currentWord,
            enteredWord,
            blinkCurrentLetter: true,
            wordChanged: false,
        },
    };
};

export const updateAndChangeCurrentWord = (currentWord, enteredWord) => {
    return {
        type: "UPDATE_CURRENT_WORD",
        payload: {
            currentWord,
            enteredWord,
            blinkCurrentLetter: false,
            wordChanged: true,
        },
    };
};

export const inactivateCurrentWord = (currentWord, enteredWord) => {
    return {
        type: "UPDATE_CURRENT_WORD",
        payload: {
            currentWord,
            enteredWord,
            blinkCurrentLetter: false,
            wordChanged: false,
        },
    };
};

export const updateInputLog = (currentWord, enteredWord) => {
    return {
        type: "UPDATE_INPUT_LOG",
        payload: {
            currentWord,
            enteredWord,
        },
    };
};

export const incrementErrorLog = () => {
    return {
        type: "INCREMENT_ERROR_LOG",
    };
};
export const decrementErrorLog = () => {
    return {
        type: "DECREMENT_ERROR_LOG",
    };
};

export const resetInputLog = () => {
    return {
        type: "RESET_INPUT_LOG",
    };
};

export const focusInput = () => {
    return {
        type: "FOCUS_INPUT",
    };
};
export const blurInput = () => {
    return {
        type: "BLUR_INPUT",
    };
};

export const resetLiveTime = () => {
    return {
        type: "RESET_LIVE_TIME",
    };
};
export const decrementLiveTime = () => {
    return {
        type: "DECREMENT_LIVE_TIME",
    };
};

export const updateTestTimer = (timeValue) => {
    return {
        type: "UPDATE_TEST_TIMER",
        payload: timeValue,
    };
};

export const showTimeInput = () => {
    return {
        type: "SHOW_TIME_INPUT",
    };
};
export const closeTimeInput = () => {
    return {
        type: "CLOSE_TIME_INPUT",
    };
};
export const showTimeMenu = () => {
    return {
        type: "SHOW_TIME_MENU",
    };
};
export const closeTimeMenu = () => {
    return {
        type: "CLOSE_TIME_MENU",
    };
};

export const switchTestOn = () => {
    return {
        type: "TEST_ON",
    };
};
export const switchTestOff = () => {
    return {
        type: "TEST_OFF",
    };
};

export const enableShowResult = () => {
    return {
        type: "ENABLE_SHOW_RESULT",
    };
};
export const disableShowResult = () => {
    return {
        type: "DISABLE_SHOW_RESULT",
    };
};

export const switchCapsLockOn = () => {
    return {
        type: "SWITCH_CAPS_LOCK_ON",
    };
};
export const switchCapsLockOff = () => {
    return {
        type: "SWITCH_CAPS_LOCK_OFF",
    };
};


export const resetTest = (dispatch) => {
    dispatch(disableShowResult());
    dispatch(switchTestOff());
    dispatch(resetWord());
    dispatch(resetInput());
    dispatch(resetInputLog());
    dispatch(newWords());
    dispatch(resetLiveTime());
};
