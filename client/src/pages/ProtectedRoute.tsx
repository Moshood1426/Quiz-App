import React, { useEffect } from "react";
import useAppContext from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { User, AuthorizeParticipant} from "../store/@types/context"


interface ProtectedRouteProps {
  children: React.ReactNode;
  client: User | AuthorizeParticipant | null;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ client, children }) => {
  const navigate = useNavigate();
  const { user, validateParticipant } = useAppContext();

  useEffect(() => {
    if (!client) {
      navigate("/landing");
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (!client) {
      navigate("/start-test");
    }
    //eslint-disable-next-line
  }, [validateParticipant]);

  return <>{children}</>;
};

export default ProtectedRoute;
