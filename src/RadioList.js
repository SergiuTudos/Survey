import React, { useState, useEffect, useContext } from "react";
import { Button, Input, Collapse, Row, Col, Typography, Divider } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { SurveyStoreContext } from "./SurveyContext";
import QuestionsModal from "./QuestionsModal";
const { Text } = Typography;
const { Panel } = Collapse;

const RadioList = (props) => {
  const qStore = useContext(SurveyStoreContext);

  const options = qStore.questions[props.q_index].answers;
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const [checkedAnswers, setCheckedAnswers] = useState([]);

  let specialQuestions = options.filter((o) => o.panel !== undefined);
  // useEffect(() => {
  //   specialQuestions = options.filter((o) => o.panel);
  // }, [options]);

  const handleCheckboxChange = (checkboxValue) => {
    if (qStore.checkedCheckboxes.includes(checkboxValue)) {
      qStore.setCheckedCheckboxes(
        qStore.checkedCheckboxes.filter((item) => item !== checkboxValue)
      );
    } else {
      qStore.setCheckedCheckboxes([...qStore.checkedCheckboxes, checkboxValue]);
    }
  };
  const questions = require("./questions.json").mock;

  const handleAddOption = () => {
    const lastId = parseInt(
      qStore.questions[props.q_index].answers[
        qStore.questions[props.q_index].answers.length - 1
      ].id
    );
    const newOption = { id: (lastId + 1).toString(), name: "" };
    setEditId(newOption.id);

    qStore.updateQuestions(props.q_index, newOption);
  };

  const handleEditOption = (id) => {
    setEditId(id);
    const option = options.find((o) => o.id === id);
    setEditValue(option.name);
  };

  const handleSaveOption = () => {
    const updatedOptions = options.map((option) =>
      option.id === editId ? { ...option, name: editValue } : option
    );
    qStore.updateAnswerText(props.q_index, updatedOptions);
    setEditId(null);
    setEditValue("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const handleCreateCustom = () => {
    qStore.setShowModal(true);
  };

  const displayOption = (option) => {
    return (
      <div
        key={option.id}
        style={{
          display: "flex",
          flex: 1,
          paddingTop: 10
        }}
      >
        {editId === option.id ? (
          <div
            style={{
              display: "flex",
              flex: 1,
              marginLeft: 20,
              marginRight: 20
            }}
          >
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <Button onClick={handleSaveOption}>Save</Button>
            <Button onClick={handleCancelEdit}>Cancel</Button>
          </div>
        ) : (
          <Row
            style={{
              display: "flex",
              flexDirection: "row",
              flex: 1,
              marginLeft: 20
            }}
          >
            <Col
              style={{
                justifyContent: "start",
                display: "flex",
                flexDirection: "row",
                flex: 1
              }}
              span={20}
            >
              <Checkbox
                style={{ textAlign: "left" }}
                checked={qStore.checkedCheckboxes.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
              >
                {option.name}
              </Checkbox>
            </Col>

            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1
              }}
              span={4}
            >
              <Button onClick={() => handleEditOption(option.id)}>Edit</Button>
            </Col>
          </Row>
        )}
      </div>
    );
  };
  const displayPreviousQuestion = (prevQ) => {
    return (
      <div
        key={prevQ.id}
        style={{
          display: "flex",
          flex: 1,
          paddingTop: 10
        }}
      >
        {prevQ.name}
      </div>
    );
  };
  const headerComp = () => {
    return (
      <div>
        {specialQuestions.map((option) => (
          <ul key={option.name}>
            <li>
              <Text>{option.name}</Text>
            </li>
          </ul>
        ))}
      </div>
    );
  };

  return (
    <div>
      <QuestionsModal {...props} />
      <div
        style={{
          paddingBottom: 20,
          paddingTop: 20,
          backgroundColor: "#adc6ff"
        }}
      >
        <Text>{questions[props.q_index].name}</Text>
      </div>
      <Collapse>
        {specialQuestions && specialQuestions.length > 0 ? (
          <Panel
            style={{ marginBottom: 20, backgroundColor: "#f0f5ff" }}
            header={headerComp()}
            key="options"
          >
            {(() => {
              let o = specialQuestions[0];
              o.name =
                questions[props.q_index - 1].answers[
                  specialQuestions[0].panel - 1
                ].name;
              return displayPreviousQuestion(o); // Call displayOption() and return its result
            })()}
          </Panel>
        ) : (
          <div />
        )}
        {options
          .filter((o) => !o.panel)
          .map((option, index) => displayOption(option))}
      </Collapse>
      <Button
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={handleAddOption}
      >
        Add New Answer
      </Button>
      {props.q_index > 0 ? (
        <Button style={{ margin: "0 10px" }} onClick={handleCreateCustom}>
          Link To Previous Answer
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default RadioList;
