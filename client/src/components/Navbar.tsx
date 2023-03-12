import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { AiOutlineMenu } from "react-icons/ai";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";
import SmallNavModal from "./SmallNavModal";

interface NavbarProps {
  goHome?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ goHome }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();

  const { user, endSession } = useAppContext();
  const nameTag = user?.firstName[0] || "A";

  const signOut = () => {
    endSession();
    navigate("/landing");
  };

  const toggleSideBar = () => {
    setShowSideBar((value) => !value);
  };

  return (
    <Wrapper>
      <div className="nav-container">
        <div
          className="logo-img"
          onClick={() => goHome && navigate("/landing")}
        >
          <Logo />
        </div>

        <ul className="nav-items">
          <li onClick={() => navigate("/landing")}>Home</li>
          <li onClick={() => navigate("/start-test")}>Take Test</li>
          <li onClick={() => navigate("/check-results")}>Check Results</li>
        </ul>

        <div className="btn-div">
          <button
            className="btn get-started-btn"
            onClick={() => navigate("/register")}
          >
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

        <div
          className="nav-toggle"
          aria-label="toggle navigation"
          onClick={() => setShowSideBar(true)}
        >
          <AiOutlineMenu />
        </div>

        {showSideBar && (
          <SmallNavModal
            showSidebar={showSideBar}
            toggleSideBar={toggleSideBar}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Navbar;
