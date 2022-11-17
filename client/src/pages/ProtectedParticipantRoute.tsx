import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAppContext from "../store/appContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedParticipantRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const { validateParticipant, validateInput } = useAppContext();

  useEffect(() => {
    if (!validateParticipant) {
      validateInput("Test submission received");
    }
    //eslint-disable-next-line
  }, [validateParticipant]);

  if (!validateParticipant) {
    return <Navigate to="/start-test" />;
  }

  return <>{children}</>;
};

export default ProtectedParticipantRoute;
