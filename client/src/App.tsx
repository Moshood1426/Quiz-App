import {
  Landing,
  Register,
  ResetPassword,
  ProtectedRoute,
  SharedLayout,
  Explore,
  ManageQuiz,
  CreateQuiz,
  Profile,
  EditQuiz,
  NotFound,
  StartTest,
  TakeTest,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Submission from "./pages/dashboard/Submission";
import useAppContext from "./store/appContext";

function App() {
  const { user, validateParticipant } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute client={user}>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManageQuiz />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/submission" element={<Submission />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          path="/:id"
          element={
            <ProtectedRoute client={user}>
              <EditQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="/start-test" element={<StartTest />} />
        <Route
          path="/take-test"
          element={
            <ProtectedRoute client={validateParticipant}>
              <TakeTest />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
