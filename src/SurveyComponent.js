import React, { useContext, useState } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Button, message, Steps, Space, Modal } from "antd";
import RadioButtonList from "./RadioButtonsList";
import RadioList from "./RadioList";
import { SurveyStoreContext } from "./SurveyContext";

const SurveyComponet = () => {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const qStore = useContext(SurveyStoreContext);
  const steps = [
    {
      title: "First",
      content: <RadioList q_index={0} options={qStore.questions[0].answers} />
    },
    {
      title: "Second",
      content: <RadioList q_index={1} options={qStore.questions[1].answers} />
    },
    {
      title: "Third",
      content: <RadioList q_index={2} options={qStore.questions[1].answers} />
    },
    {
      title: "Last",
      content: <RadioList q_index={3} options={qStore.questions[3].answers} />
    }
  ];

  const next = () => {
    setCurrent(current + 1);
    qStore.setCheckedCheckboxes([]);
  };

  const prev = () => {
    setCurrent(current - 1);
    qStore.setCheckedCheckboxes([]);
  };
  const handleCreateCustom = () => {
    setShowModal(true);
  };

  const handleCheckboxChange = (checkboxValue) => {
    if (selectedCheckboxes.includes(checkboxValue)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== checkboxValue)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    }
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <>
      <Steps current={current} items={items} />
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current > 0 && (
          <Space>
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          </Space>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </>
  );
};

export default SurveyComponet;
