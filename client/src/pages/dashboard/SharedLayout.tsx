import React from "react";
import { Navbar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";
import actions from "../../utils/actions";
import { Outlet, NavLink } from "react-router-dom";

const SharedLayout = () => {
  return (
    <Wrapper>
      <Navbar />
      <div className="actions">
        <div className="actions-container">
          {actions.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "actions-item active-actions-item" : "actions-item"
                }
              >
                {item.title}
              </NavLink>
            );
          })}
        </div>
      </div>
      <div className="outlet-container">
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default SharedLayout;
