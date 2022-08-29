import React, { useEffect } from "react";
import useAppContext from "../store/appContext";
import { Navigate } from "react-router-dom";
import { User, AuthorizeParticipant } from "../store/@types/context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  client: User | AuthorizeParticipant | null;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  client,
  children,
}) => {
  //refactor function to check if type of prop passed as client is user or participant
  function instanceOfUser(object: any): object is User {
    return true;
  }

  if (!client) {
    if (instanceOfUser(client)) {
      return <Navigate to="/landing" />;
    } else {
      return <Navigate to="/start-test" />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
