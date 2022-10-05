import moment from "moment";

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
  if (!startDate && endDate) {
    const endDat = moment(endDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: anytime</p>
        <p className="single-quiz-date-time">⏰ End: {endDat}</p>
      </>
    );
  }
  if (startDate && !endDate) {
    const startDat = moment(startDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: {startDat}</p>
        <p className="single-quiz-date-time">⏰ End: anytime</p>
      </>
    );
  }
  if (!startDate && !endDate) {
    return (
      <>
        <p className="single-quiz-date-time">⏰ Start: anytime</p>
        <p className="single-quiz-date-time">⏰ End: anytime</p>
      </>
    );
  }
};

const getSubmissionTime = (startDate: Date | "", endDate: Date | "") => {
  if (startDate && endDate) {
    const startDat = moment(startDate).format("lll");
    const endDat = moment(endDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">
          {startDat} - {endDat}
        </p>
      </>
    );
  }
  if (!startDate && endDate) {
    const endDat = moment(endDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">anytime - {endDat}</p>
      </>
    );
  }
  if (startDate && !endDate) {
    const startDat = moment(startDate).format("lll");
    return (
      <>
        <p className="single-quiz-date-time">{startDat} - anytime</p>
      </>
    );
  }
  if (!startDate && !endDate) {
    return (
      <>
        <p className="single-quiz-date-time">anytime - anytime</p>
      </>
    );
  }
};

const shuffleArray = (array: (string | number)[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const paginationGenerator = (current: number, last: number, width = 1) => {
  const left = current - width;
  const right = current + width + 1;
  const range = [];
  const rangeWithDots: (string | number)[] = [];
  let l: number;

  for (let i = 1; i <= last; i += 1) {
    if (i === 1 || i === last || (i >= left && i <= right)) {
      range.push(i);
    } else if (i < left) {
      i = left - 1;
    } else if (i > right) {
      range.push(last);
      break;
    }
  }

  range.forEach((i) => {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  });

  return rangeWithDots;
};

function dateDifference(startDate: Date, endDate: Date) {
  return moment(startDate).diff(moment(endDate), "seconds");
}

const getTestTimeLeft = (
  currentDate: Date,
  startDate: Date | string,
  endDate: Date | string
) => {
  if (!endDate) {
    return "anytime";
  } else {
    const finish = new Date(endDate);
    const result = dateDifference(finish, currentDate);
    return result;
  }
};

const getTestDuration = (startDate: Date | null, endDate: Date | null) => {
  const currentDate = new Date();
  if (startDate && endDate) {
    return dateDifference(endDate, startDate);
  }
  if (!startDate && endDate) {
    return dateDifference(endDate, currentDate);
  }
  if (startDate && !endDate) {
    return "anytime";
  }
  if (!startDate && !endDate) {
    return "anytime";
  }
  return "anytime"
};

export default actions;
export {
  getTime,
  shuffleArray,
  getSubmissionTime,
  paginationGenerator,
  getTestTimeLeft,
  getTestDuration,
};
