import { Route, Routes } from "react-router";
import AppContent from "./components/dashboards/AppContent";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AppContent />} />
    </Routes>
  );
}

export default App;
