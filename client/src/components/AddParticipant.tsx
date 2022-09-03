import React, { useState } from "react";
import Wrapper from "../assets/wrappers/AddParticipant";
import FormItem from "./FormItem";
import useAppContext from "../store/appContext";
import { MdOutlineCancel } from "react-icons/md";
import Alert from "./Alert";

const AddParticipant = () => {
  const [participantData, setParticipantData] = useState({
    firstName: "",
    lastName: "",
    identifier: "",
  });

  const {
    showAlert,
    singleQuizDetails,
    singleQuizParticipants,
    addParticipant,
    deleteParticipant,
    validateInput,
  } = useAppContext();

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
    console.log("here");
    if (!firstName || !lastName || !identifier) {
      validateInput("kindly input all essential fields");
      return;
    }
    const { _id: quizId } = singleQuizDetails!;
    console.log(quizId);
    if (!quizId) {
      validateInput("kindly input all essential fields");
      return;
    }
    addParticipant({
      firstName,
      lastName,
      identifier,
      quizId,
    });
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
            value={participantData.lastName}
            onChange={handleChange}
          />
          <FormItem
            name={"identifier"}
            placeholder={"enter unique identifier"}
            type={"text"}
            value={participantData.identifier}
            onChange={handleChange}
          />
          <span className="form-info">
            Note: identifer may be matric no, email or unique identificator
          </span>
          <button type="submit" className="btn add-btn">
            Add
          </button>
        </form>
        {singleQuizParticipants.map((item, index) => {
          return (
            <p className="participant-identifier" key={index}>
              {item.identifier}
              <MdOutlineCancel
                onClick={() =>
                  deleteParticipant(singleQuizDetails?._id!, item._id)
                }
              />
            </p>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default AddParticipant;
