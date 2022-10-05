import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const { user, logoutUser } = useAppContext();
  const nameTag = user?.firstName[0] || "A";

  const signOut = () => {
    logoutUser()
    navigate("/landing")
  }

  return (
    <Wrapper>
      <div className="nav-container">
        <div>
          <Logo />
        </div>

        <ul className="nav-items">
          <li onClick={() => navigate("/landing")}>Home</li>
          <li onClick={() => navigate("/start-test")}>Take Test</li>
          <li onClick={() => navigate("/check-results")}>Check Results</li>
        </ul>

        <div className="btn-div">
          <button className="btn get-started-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>

        <div className="user-container">
          <div className="user" onClick={() => setShowLogout((item) => !item)}>
            <span>{nameTag}</span>
          </div>

          <div
            className={showLogout ? "logout-dropdown" : "hide-logout-dropdown"}
          >
            <p className="dropdown-name">{user?.firstName}</p>
            <div className="dropdown-action">
              <p
                className="dropdown-action-item"
                onClick={() => {
                  navigate("/");
                  setShowLogout(false);
                }}
              >
                Manage quiz
              </p>
              <p
                className="dropdown-action-item"
                onClick={() => {
                  navigate("/profile");
                  setShowLogout(false);
                }}
              >
                Settings
              </p>
            </div>
            <span className="dropdown-btn" onClick={() => signOut()}>
              Sign out
            </span>
          </div>
        </div>

        <div className="nav-toggle" aria-label="toggle navigation">
          <AiOutlineMenu />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
