import moment from "moment"

const actions = [
  { id: 1, title: "Explore", to: "/explore" },
  { id: 2, title: "Create quiz", to: "/create-quiz" },
  { id: 3, title: "Manage quiz", to: "/" },
  { id: 4, title: "Submissions", to: "/submission" },
  { id: 5, title: "Profile", to: "/profile" },
];

const getTime = (startDate: Date | "", endDate: Date | "") => {
  if (startDate && endDate) {
    const startDat = moment(startDate).format("lll");
    const endDat = moment(endDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: {startDat}</p>
        <p className="single-quiz-date-time">⏰ End: {endDat}</p>
      </>
    );
  }
  if(!startDate && endDate) {
    const endDat = moment(endDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: anytime</p>
        <p className="single-quiz-date-time">⏰ End: {endDat}</p>
      </>
    );
  }
  if(startDate && !endDate) {
    const startDat = moment(startDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: {startDat}</p>
        <p className="single-quiz-date-time">⏰ End: anytime</p>
      </>
    );
  }
  if(!startDate && !endDate) {
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: anytime</p>
        <p className="single-quiz-date-time">⏰ End: anytime</p>
      </>
    );
  }
};

export default actions
export { getTime }