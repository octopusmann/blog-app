import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (isAuthenticated) {
    return children;
  } else {
    navigate("/login");
  }
  return children;
};

export default PrivateRoute;
