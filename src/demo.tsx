import React, { useState } from "react";
import SurveyComponet from "./SurveyComponent";
import { SurveyStore } from "./SurveyContext";

const App: React.FC = () => {
  return (
    <>
      <SurveyStore>
        <SurveyComponet />
      </SurveyStore>
    </>
  );
};

export default App;
