import React from "react";
import { Navigate } from "react-router-dom";
import useAppContext from "../store/appContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedParticipantRoute: React.FC<ProtectedRouteProps>= ({ children }) => {
  const { validateParticipant } = useAppContext();

  if (!validateParticipant) {
    return <Navigate to="/landing" />;
  }

  return <>{children}</>;
};

export default ProtectedParticipantRoute;
