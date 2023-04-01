import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import constants from "../../utilities/constants";
import Header from "../Header";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = constants.getAuthTokenFromSessionStorage();
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="min-h-full">
      <ToastContainer />
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
