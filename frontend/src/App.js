import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import BlogDetailPage from "./routes/BlogDetailPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
