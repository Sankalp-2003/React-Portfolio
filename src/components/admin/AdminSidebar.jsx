/* eslint-disable react/prop-types */
// @ts-nocheck
import { useEffect } from "react";
import { CiLogout } from "react-icons/ci";
import { MdEdit } from "react-icons/md";
import "./adminSidebar.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addOrUpdateProfilePic,
  fetchProfilePic,
} from "../../redux/slices/profileSlice";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Puff } from "react-loader-spinner";

const AdminSidebar = ({ handleLogout, showSidebar, toggleSidebar }) => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      dispatch(addOrUpdateProfilePic(e.target.files[0]))
        .unwrap()
        .then((newProfileData) => {
          dispatch({
            type: "profile/setProfilePic",
            payload: newProfileData.profilePic,
          });
        });
    }
  };

  useEffect(() => {
    dispatch(fetchProfilePic());
  }, [dispatch]);
  return (
    <div
      className={`admin-sidebar ${
        showSidebar ? "sidebar-open" : "sidebar-close"
      }`}
    >
      <div className="top">
        <div className="image-container">
          <div className="profile-image">
            <img
              src={
                profile?.profilePic ||
                "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              }
              alt="profile-image"
            />
            <label htmlFor="profile-image" className="edit-image">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
              <MdEdit />
            </label>
            {loading && (
              <div className="profile-image-loader">
                <Puff
                  visible={true}
                  height="80"
                  width="80"
                  color="#663399"
                  ariaLabel="puff-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            )}
          </div>
          <h3>Dashboard</h3>
        </div>
        <ErrorMessage error={error?.message} />

        <div className="links">
          <NavLink
            to="projects"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            Projects
          </NavLink>

          <NavLink
            to="add-project"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            Add New Project
          </NavLink>

          <NavLink
            to="skills"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            Skills
          </NavLink>

          <NavLink
            to="add-skill"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            Add New Skill
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={toggleSidebar}
          >
            Home
          </NavLink>
        </div>
      </div>
      <div className="bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <CiLogout /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
