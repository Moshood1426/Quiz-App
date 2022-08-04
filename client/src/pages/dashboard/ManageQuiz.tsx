import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/ManageQuiz";
import {
  AllQuiz,
  FormItem,
  FormSelectItem,
  QuizActivities,
  ViewSingleQuiz,
} from "../../components";
import Loading from "../../components/Loading";
import { GetAllQuizArgs } from "../../store/@types/context";
import useAppContext from "../../store/appContext";

const initialState: GetAllQuizArgs = {
  title: "",
  code: "",
  sortOptions: ["all", "latest", "oldest", "a-z", "z-a"],
  sort: "all",
  privacyOptions: ["all", "private", "public"],
  privacy: "all",
};

const ManageQuiz = () => {
  const [formData, setFormData] = useState(initialState);
  const [isActive, setIsActive] = useState<"all" | "moderated" | "quick">(
    "all"
  );
  const { getAllQuiz, isLoading, manageSingleQuiz } =
    useAppContext();

  useEffect(() => {
    const reqObj: GetAllQuizArgs = {
      title: formData.title,
      code: formData.code,
      sort: formData.sort,
      privacy: formData.privacy,
      type: isActive,
    };
    if (!manageSingleQuiz) {
      getAllQuiz(reqObj);
    }
    //eslint-disable-next-line
  }, [isActive, formData, manageSingleQuiz]);

  useEffect(() => {
    if (manageSingleQuiz) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [manageSingleQuiz]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const setType = (isActive: "all" | "moderated" | "quick") => {
    setIsActive(isActive);
  };

  const clearFilters = () => {
    setFormData(initialState);
  };

  return (
    <Wrapper>
      <h3 className="title">Manage Quiz</h3>
      <div className="manage-quiz-header-line">
        <ul className="manage-quiz-list">
          <li
            className={`${isActive === "all" && "active"}`}
            onClick={() => setType("all")}
          >
            All
          </li>
          <li
            className={`${isActive === "moderated" && "active"}`}
            onClick={() => setType("moderated")}
          >
            Moderated
          </li>
          <li
            className={`${isActive === "quick" && "active"}`}
            onClick={() => setType("quick")}
          >
            Quick
          </li>
        </ul>
        <span className="manage-quiz-filter-btn" onClick={clearFilters}>
          ❌ filters
        </span>
      </div>
      <div className="manage-quiz-filter">
        <FormItem
          label={true}
          name={"title"}
          placeholder={"search by title"}
          type={"text"}
          value={formData.title}
          onChange={handleChange}
        />
        <FormItem
          label={true}
          name={"code"}
          placeholder={"search by code"}
          type={"text"}
          value={formData.code}
          onChange={handleChange}
        />
        <FormSelectItem
          name={"privacy"}
          value={formData.privacy}
          onChange={handleChange}
          options={formData.privacyOptions!}
        />
        <FormSelectItem
          name={"sort"}
          value={formData.sort}
          onChange={handleChange}
          options={formData.sortOptions!}
        />
      </div>
      <div className="manage-quiz-content-container">
        {!manageSingleQuiz && isLoading ? (
          <Loading />
        ) : (
          <>
            <AllQuiz />
            <QuizActivities />
          </>
        )}
      </div>
      {manageSingleQuiz && (
        <ViewSingleQuiz />
      )}
    </Wrapper>
  );
};

export default ManageQuiz;
