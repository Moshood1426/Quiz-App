import React, { useEffect, useState, useRef } from "react";
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
import { BiRefresh } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const initialState: GetAllQuizArgs = {
  title: "",
  code: "",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  sort: "latest",
  privacyOptions: ["all", "private", "public"],
  privacy: "all",
};

const ManageQuiz = () => {
  const [formData, setFormData] = useState(initialState);
  const [isActive, setIsActive] = useState<"all" | "moderated" | "quick">(
    "all"
  );

  const {
    user,
    getAllQuiz,
    quiz: allQuiz,
    isLoading,
    manageSingleQuiz,
  } = useAppContext();
  const navigate = useNavigate();

  const firstUpdate = useRef("no render");

  useEffect(() => {
    if (!user) {
      navigate("/register");
    }
  //eslint-disabble-next-line
  }, [user]);

  //gets all quiz on first render if all quiz does not exist
  useEffect(() => {
    const reqObj: GetAllQuizArgs = {
      title: formData.title,
      code: formData.code,
      sort: formData.sort,
      privacy: formData.privacy,
      type: isActive,
    };

    if (!manageSingleQuiz && !allQuiz) {
      getAllQuiz(reqObj);
    }
    //eslint-disable-next-line
  }, [isActive, manageSingleQuiz]);

  //preventing page from reloading on first render when there's existing quiz array
  //The page only reloads when a filter is added
  useEffect(() => {
    if (firstUpdate.current === "no render") {
      firstUpdate.current = "first render";
      return;
    }

    if (firstUpdate.current === "first render") {
      firstUpdate.current = "second render";
      return;
    }

    refreshAllQuiz();
    //eslint-disable-next-line
  }, [formData, isActive]);

  //introduces side bar for the single quiz modal
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

  const refreshAllQuiz = () => {
    const reqObj: GetAllQuizArgs = {
      title: formData.title,
      code: formData.code,
      sort: formData.sort,
      privacy: formData.privacy,
      type: isActive,
    };

    getAllQuiz(reqObj);
  };

  const clearFilters = () => setFormData(initialState);

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
        <div className="manage-quiz-actions">
          <BiRefresh
            className="manage-quiz-refresh-btn"
            onClick={refreshAllQuiz}
          />
          <span className="manage-quiz-filter-btn" onClick={clearFilters}>
            ❌ filters
          </span>
        </div>
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
      {manageSingleQuiz && <ViewSingleQuiz />}
    </Wrapper>
  );
};

export default ManageQuiz;
