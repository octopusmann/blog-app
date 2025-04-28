import { createContext, useContext, useState } from "react";
import { logout } from "../endpoints/api";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isIconOpen, setIsIconOpen] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out!",
    });

    if (result.isConfirmed) {
      const success = await logout();
      if (success) {
        setIsAuthenticated(false);
        setIsIconOpen(false);
        await Swal.fire("Logged Out!", "You have been logged out.", "success");
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    }
  };

  return (
    <NavbarContext.Provider value={{ isIconOpen, setIsIconOpen, handleLogout }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
