import React from "react";
import Wrapper from "../assets/wrappers/SmallNavModal";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { links } from "../utils/actions";

interface SmallNavModalProps {
  showSidebar: boolean;
  toggleSideBar: () => void;
}

const SmallNavModal: React.FC<SmallNavModalProps> = ({
  showSidebar,
  toggleSideBar,
}) => {
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => toggleSideBar()}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  to={path}
                  key={id}
                  onClick={toggleSideBar}
                  className={({ isActive }) =>
                    isActive ? "nav-link active-item" : "nav-link"
                  }
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallNavModal;
