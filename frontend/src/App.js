import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import BlogDetailPage from "./routes/BlogDetailPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import CreateBlogPage from "./routes/CreateBlogPage";
import { AuthProvider } from "./contexts/useAuth";
import PrivateRoute from "./components/privateRoute";
import { ThemeProvider } from "./contexts/ThemeMode";
import Navbar from "./components/navbar";
import { NavbarProvider } from "./contexts/NavbarContext";
import { ErrorPage } from "./routes/errorPage";

function App() {
  return (
    <div>
      <Router>
        <ThemeProvider>
          <AuthProvider>
            <NavbarProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/create"
                  element={
                    <PrivateRoute>
                      <CreateBlogPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/about" element={<ErrorPage />}></Route>
              </Routes>
            </NavbarProvider>
          </AuthProvider>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
