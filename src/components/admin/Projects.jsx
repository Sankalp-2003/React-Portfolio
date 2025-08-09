// @ts-nocheck
import { useNavigate } from "react-router-dom";
import "./projects.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../../redux/slices/projectSlice";
import ErrorMessage from "../errorMessage/ErrorMessage";
import RectangularLoader from "../loaders/RectangularLoader";

const Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <>
      <h1 className="project-title">My Projects</h1>
      <div className="projects-container">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <RectangularLoader key={index} />
          ))
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          projects.map((project, index) => (
            <button
              key={index}
              onClick={() => navigate(`${project._id}`)}
              className="project"
            >
              <div className="project-image">
                <img src={project.thumbnail} alt={project.name} />
              </div>
              <div className="project-info">
                <h3 className="project-name">{project.title}</h3>
                <p>{project.para}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </>
  );
};

export default Projects;
