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
  Activities,
  EditQuiz,
  NotFound,
} from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
          <Route index element={<Explore />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/manage-quiz" element={<ManageQuiz />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route
          path="/edit-quiz/:id"
          element={
            <ProtectedRoute>
              <EditQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<NotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
