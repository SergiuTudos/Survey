import React, { useState } from "react";
import { Button, Input, Row, Col } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Column from "antd/lib/table/Column";

const RadioButtonList = (props) => {
  const [options, setOptions] = useState(props.answers);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleCreateCustom = () => {
    setShowModal(true);
  };
  const handleModalSave = () => {
    // Perform save action here
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
  const handleAddOption = () => {
    const newOption = { id: Date.now(), name: "" };
    setOptions([...options, newOption]);
  };
  const handleEditOption = (id) => {
    setEditId(id);
    const option = options.find((o) => o.id === id);
    setEditName(option.name);
  };

  const handleSaveOption = () => {
    const updatedOptions = options.map((option) =>
      option.id === editId ? { ...option, name: editName } : option
    );
    setOptions(updatedOptions);
    setEditId(null);
    setEditName("");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  return (
    <div>
      {options.map((option) => (
        <div
          key={option.id}
          style={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
            display: "flex"
          }}
        >
          {editId === option.id ? (
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
                flex: 1,
                marginLeft: 20
              }}
            >
              <div>
                <Input
                  style={{ width: 450, marginTop: 10 }}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </div>
              <div>
                <Button onClick={handleSaveOption}>Save</Button>
                <Button onClick={handleCancelEdit}>Cancel</Button>
              </div>
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
                  key={option.name}
                  value={option.name}
                >
                  {option.name}
                </Checkbox>
              </Col>
              <Col
                span={4}
                style={{
                  justifyContent: "end",
                  display: "flex",
                  flexDirection: "row",
                  flex: 1,
                  marginRight: 50
                }}
              >
                <Button onClick={() => handleEditOption(option.id)}>
                  Edit
                </Button>
              </Col>
            </Row>
          )}
        </div>
      ))}
      <Button
        style={{ marginTop: 20, marginBottom: 20 }}
        onClick={handleAddOption}
      >
        Add Answer
      </Button>
    </div>
  );
};

export default RadioButtonList;
