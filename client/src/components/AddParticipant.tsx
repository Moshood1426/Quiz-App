import React, { useState } from "react";
import Wrapper from "../assets/wrappers/AddParticipant";
import FormItem from "./FormItem";
import useAppContext from "../store/appContext";
import Alert from "./Alert";

const AddParticipant = () => {
  const [participantData, setParticipantData] = useState({
    firstName: "",
    lastName: "",
    identifier: "",
  });

  const { showAlert, validateInput } = useAppContext();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setParticipantData(() => ({ ...participantData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { firstName, lastName, identifier } = participantData;
    console.log("here")
    if (!firstName || !lastName || !identifier) {
      validateInput("kindly input all essential fields");
    }
  };

  return (
    <Wrapper>
      <div className="add-participants">
        <form className="add-participant-form" onSubmit={handleSubmit}>
          <h5 className="form-title">Add Participant</h5>
          <FormItem
            name={"firstName"}
            placeholder={"participant first name"}
            type={"text"}
            value={participantData.firstName}
            onChange={handleChange}
          />
          <FormItem
            name={"lastName"}
            placeholder={"participant first name"}
            type={"text"}
            value={participantData.firstName}
            onChange={handleChange}
          />
          <FormItem
            name={"identifier"}
            placeholder={"enter unique identifier"}
            type={"text"}
            value={participantData.firstName}
            onChange={handleChange}
          />
          <span className="form-info">
            Note: identifer may be matric no, email or unique identificator
          </span>
          <button type="submit" className="btn add-btn">
            Add
          </button>
        </form>
      </div>
    </Wrapper>
  );
};

export default AddParticipant;
