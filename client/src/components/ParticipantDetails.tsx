import React from "react";
import Wrapper from "../assets/wrappers/ParticipantDetails";
import useAppContext from "../store/appContext";

const ParticipantDetails: React.FC = () => {
  const { participantInfo } = useAppContext();

  const percentage = Math.round(
    (participantInfo?.pointsObtained! / participantInfo?.pointsObtainable!) *
      100
  );

  const remarks =
    percentage > 75
      ? "Excellent"
      : percentage > 50
      ? "Very Good"
      : percentage > 25
      ? "Good"
      : "Try Harder";

  return (
    <Wrapper>
      <div>
        <span className="quiz-details-title">Student name:</span>
        <h5>{participantInfo?.firstName + " " + participantInfo?.lastName}</h5>
      </div>
      <div>
        <span className="quiz-details-title">identifier:</span>
        <h5>{participantInfo?.identifier}</h5>
      </div>
      <div>
        <span className="quiz-details-title">Points Obtainable</span>
        <h5>{participantInfo?.pointsObtainable} points</h5>
      </div>
      <div>
        <span className="quiz-details-title">Points Obtained</span>
        <h5>{participantInfo?.pointsObtained} points</h5>
      </div>
      <div>
        <span className="quiz-details-title">Percentage(%)</span>
        <h5>{percentage}%</h5>
      </div>
      <div>
        <span className="quiz-details-title">Remarks</span>
        <h5>{remarks}</h5>
      </div>
    </Wrapper>
  );
};

export default ParticipantDetails;
