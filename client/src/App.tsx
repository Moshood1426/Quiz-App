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
  ProtectedParticipantRoute,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Submission from "./pages/dashboard/Submission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
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
            <ProtectedRoute>
              <EditQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="/start-test" element={<StartTest />} />
        <Route
          path="/take-test"
          element={
            <ProtectedParticipantRoute>
              <TakeTest />
            </ProtectedParticipantRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
