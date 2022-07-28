import React, { useEffect } from "react";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useAppContext();

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }
    //eslint-disable-next-line
  }, [user]);

  return <>{children}</>;
};

export default ProtectedRoute;
