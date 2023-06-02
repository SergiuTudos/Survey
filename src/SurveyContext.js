import React, { createContext, useContext, useReducer } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";
const TOGGLE_CHECKBOX = "TOGGLE_CHECKBOX";
const UPDATE_CHECKBOXES = "UPDATE_CHECKBOXES";
const UPDATE_SHOW_MODAL = "UPDATE_SHOW_MODAL";

// Create a context for the survey store
export const SurveyStoreContext = createContext();

// Custom hook to use the survey store
const useSurveyStore = () => useContext(SurveyStoreContext);

// Reducer function
const surveyReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_CHECKBOX:
      if (state.selectedCheckboxes.includes(action.value)) {
        return {
          ...state,
          selectedCheckboxes: state.selectedCheckboxes.filter(
            (item) => item !== action.value
          )
        };
      } else {
        return {
          ...state,
          selectedCheckboxes: [...state.selectedCheckboxes, action.value]
        };
      }
    case UPDATE_QUESTIONS: {
      return {
        ...state,
        questions: action.value
      };
    }
    case UPDATE_SHOW_MODAL: {
      return {
        ...state,
        showModal: action.value
      };
    }
    case UPDATE_CHECKBOXES: {
      return {
        ...state,
        checkedCheckboxes: action.value
      };
    }
    default:
      return state;
  }
};

// Initial state for the survey store
const questionsMock = require("./questions.json").mock;
const initialSurveyState = {
  selectedCheckboxes: [],
  checkedCheckboxes: [],
  questions: questionsMock,
  showModal: false
};

// Survey store component
export const SurveyStore = ({ children }) => {
  const [state, dispatch] = useReducer(surveyReducer, initialSurveyState);

  const toggleCheckbox = (checkboxValue) => {
    dispatch({ type: TOGGLE_CHECKBOX, value: checkboxValue });
  };
  const addPanel = (index, answers, label) => {
    let { questions } = state;
    answers.forEach((element) => {
      questions[index].answers[element - 1].panel = label;
    });

    dispatch({ type: UPDATE_QUESTIONS, value: questions });
  };
  const clearAnswers = (question_id) => {
    let { questions } = state;
    questions[question_id].answers = [];
    dispatch({ type: UPDATE_QUESTIONS, value: questions });
  };
  const updateQuestions = (index, question) => {
    let { questions } = state;
    let { answers } = questions[index];
    questions[index].answers = [...answers, question];

    dispatch({ type: UPDATE_QUESTIONS, value: questions });
  };
  const updateAnswerText = (index, updatedAnswers) => {
    let { questions } = state;
    questions[index].answers = updatedAnswers;

    dispatch({ type: UPDATE_QUESTIONS, value: questions });
  }; // Provide the survey store through the context
  const setShowModal = (showModal) => {
    dispatch({ type: UPDATE_SHOW_MODAL, value: showModal });
  }; //
  const setCheckedCheckboxes = (checkboxes) => {
    dispatch({ type: UPDATE_CHECKBOXES, value: checkboxes });
  };
  return (
    <SurveyStoreContext.Provider
      value={{
        ...state,
        toggleCheckbox,
        addPanel,
        clearAnswers,
        updateQuestions,
        updateAnswerText,
        setShowModal,
        setCheckedCheckboxes
      }}
    >
      {children}
    </SurveyStoreContext.Provider>
  );
};
