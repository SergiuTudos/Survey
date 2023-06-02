import React, { useContext, useState } from "react";
import { Modal, Button, Col, Row, Input, Radio } from "antd";
import { SurveyStoreContext } from "./SurveyContext";

const QuestionsModal = (props) => {
  const qStore = useContext(SurveyStoreContext);
  const [checkedAnswer, setcheckedAnswer] = useState(1);

  const handleModalSave = () => {
    qStore.setShowModal(false);
    qStore.addPanel(props.q_index, qStore.checkedCheckboxes, checkedAnswer);
    qStore.setCheckedCheckboxes([]);
  };

  const handleCloseModal = () => {
    qStore.setShowModal(false);
  };

  const handleAnswerChange = (e) => {
    setcheckedAnswer(e.target.value);
  };
  const displayAnswers = (option) => {
    return (
      <div
        key={option.id}
        style={{
          display: "flex",
          flex: 1
        }}
      >
        <Radio.Group onChange={handleAnswerChange} value={checkedAnswer}>
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
              <Radio style={{ textAlign: "left" }} value={parseInt(option.id)}>
                {option.name}
              </Radio>
            </Col>
          </Row>
        </Radio.Group>
      </div>
    );
  };
  return (
    <div>
      {props.q_index > 0 ? (
        <Modal
          title="Create Custom"
          visible={qStore.showModal}
          onCancel={handleCloseModal}
          footer={[
            <Button key="cancel" onClick={handleCloseModal}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={handleModalSave}>
              Save
            </Button>
          ]}
        >
          {qStore.questions[props.q_index - 1].answers.map((option, index) =>
            displayAnswers(option)
          )}
        </Modal>
      ) : (
        <div />
      )}
    </div>
  );
};

export default QuestionsModal;
