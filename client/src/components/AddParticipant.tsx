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
    if (!firstName || !lastName || !identifier) {
      validateInput("kindly input all essential fields");
      return;
    }

    const { _id: quizId } = singleQuizDetails!;
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

    setParticipantData({
      firstName: "",
      lastName: "",
      identifier: "",
    });
  };

  return (
    <Wrapper>
      <div className="add-participants">
        <div className="alert">{showAlert && <Alert />}</div>

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
            placeholder={"participant last name"}
            type={"text"}
            value={participantData.lastName}
            onChange={handleChange}
          />
          <FormItem
            name={"identifier"}
            placeholder={"participant email"}
            type={"text"}
            value={participantData.identifier}
            onChange={handleChange}
          />
          <ul className="form-info">
            Note:
            <li className="form-info-item">
              identifer may be matric no, email or unique identificator
            </li>
            <li className="form-info-item">
              Only participant added can take private quiz
            </li>
          </ul>
          <button type="submit" className="btn add-btn">
            Add
          </button>
        </form>

        <div className="participant-info">
          {singleQuizParticipants.map((item, index) => {
            return (
              <p className="participant-identifier" key={index}>
                {item.identifier}
                <span
                  onClick={() =>
                    deleteParticipant(singleQuizDetails?._id!, item._id)
                  }
                  className="delete-participant"
                >
                  ❌
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default AddParticipant;
