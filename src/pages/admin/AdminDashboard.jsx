// @ts-nocheck
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import "./adminDashboard.scss";
import { logout } from "../../redux/slices/authSlice";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="admin-dashboard">
      <div className="admin-navbar">
        <MdMenu className="admin-icons" onClick={toggleSidebar} />
        <RxCross2
          className={`admin-icons ${!isSidebarOpen && "hide-icon"}`}
          onClick={toggleSidebar}
        />
      </div>
      <AdminSidebar
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
        showSidebar={isSidebarOpen}
      />
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
