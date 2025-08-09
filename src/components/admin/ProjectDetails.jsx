// @ts-nocheck
import { useNavigate, useParams } from "react-router-dom";
import "./projectDetails.scss";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { HiStatusOnline } from "react-icons/hi";
import formatDate from "../utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchProjectById,
  updateProject,
} from "../../redux/slices/projectSlice";
import DeleteConfirmation from "../popups/DeleteConfirmation";
import { getSkillImages } from "../../redux/slices/skillSlice";
import {
  getSortedSkills,
  spaceToUnderscore,
  underscoreToSpace,
} from "../utils/utilities";
import EditSaveCancelButton from "../common/EditSaveCancelButton";
const ProjectDetails = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    name: "",
    para: "",
    git: "",
    link: "",
    thumbnail: "",
    description: "",
    techStack: [],
  });
  const { id } = useParams();
  const { project, loading } = useSelector((state) => state.projects);
  const { skillImages } = useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortedSkills = getSortedSkills(skillImages, projectDetails.techStack);

  const isEdited =
    projectDetails?.title !== project?.title ||
    projectDetails?.thumbnail !== project?.thumbnail ||
    projectDetails?.thumbnail !== project?.thumbnail ||
    projectDetails?.name !== project?.name ||
    projectDetails?.para !== project?.para ||
    projectDetails?.git !== project?.git ||
    projectDetails?.link !== project?.link ||
    projectDetails?.description !== project?.description ||
    projectDetails?.techStack !== project?.techStack;

  const handleUpdateProject = async () => {
    try {
      await dispatch(updateProject({ id, projectData: projectDetails }));
      dispatch(fetchProjectById(id));
      setIsEditable(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await dispatch(deleteProject(id));
      navigate("/admin/projects");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectDetails((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };

  useEffect(() => {
    dispatch(fetchProjectById(id));
    dispatch(getSkillImages());
  }, [dispatch, id]);

  useEffect(() => {
    if (project) {
      setProjectDetails({
        title: project.title || "",
        name: project.name || "",
        para: project.para || "",
        git: project.git || "",
        link: project.link || "",
        thumbnail: project.thumbnail || "",
        description: project.description || "",
        techStack: project.techStack || [],
        updatedAt: project.updatedAt || "",
      });
    }
  }, [project]);

  return (
    <div className="project-details">
      <div className="title-container">
        <div className="title-and-date">
          <input
            className={`custom-input title-input ${
              isEditable && "is-editable"
            }`}
            type="text"
            value={projectDetails.title}
            readOnly={!isEditable}
            onChange={(e) =>
              setProjectDetails({
                ...projectDetails,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="button-and-date">
          {projectDetails?.updatedAt && (
            <p>
              Updated on:{" "}
              <span className="date">
                {formatDate(projectDetails?.updatedAt)}
              </span>
            </p>
          )}
          <EditSaveCancelButton
            hasItem={project}
            isEditable={isEditable}
            isEdited={isEdited}
            isLoading={loading}
            onEditToggle={() => setIsEditable((prev) => !prev)}
            onSave={handleUpdateProject}
          />
          <button
            onClick={() => setDeleteConfirmation(true)}
            className="project-delete-button"
          >
            <MdDelete /> Delete
          </button>
        </div>
      </div>
      <div className="project-image-container">
        <div
          className={`image ${isEditable && "is-editable"} ${
            loading && "loader"
          }`}
        >
          {!loading && (
            <img
              src={
                typeof projectDetails.thumbnail === "string"
                  ? projectDetails.thumbnail
                  : URL.createObjectURL(projectDetails.thumbnail)
              }
            />
          )}
          {isEditable && (
            <label htmlFor="thumbnail-edit" className="edit-option">
              <MdOutlineModeEdit />
            </label>
          )}
          <input
            id="thumbnail-edit"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            hidden
          />
        </div>
        <div className="name-para">
          <input
            className={`name name-para-children custom-input ${
              isEditable && "is-editable"
            } ${loading && "loader"}`}
            value={projectDetails.name}
            onChange={(e) =>
              setProjectDetails({ ...projectDetails, name: e.target.value })
            }
            readOnly={!isEditable}
          />
          <input
            className={`para name-para-children custom-input ${
              isEditable && "is-editable"
            } ${loading && "loader"}`}
            value={projectDetails.para}
            onChange={(e) =>
              setProjectDetails({ ...projectDetails, para: e.target.value })
            }
            readOnly={!isEditable}
          />
        </div>
      </div>
      <div className="project-links-container">
        <div
          className={`link-wrapper ${isEditable && "is-editable"} ${
            loading && "loader"
          }`}
        >
          <FaGithub />
          <input
            type="text"
            value={projectDetails.git}
            readOnly={!isEditable}
            className="project-links custom-input"
            onChange={(e) =>
              setProjectDetails({ ...projectDetails, git: e.target.value })
            }
          />
        </div>
        <div
          className={`link-wrapper ${isEditable && "is-editable"} ${
            loading && "loader"
          }`}
        >
          <HiStatusOnline />
          <input
            type="text"
            value={projectDetails.link}
            readOnly={!isEditable}
            className="project-links custom-input"
            onChange={(e) =>
              setProjectDetails({ ...projectDetails, link: e.target.value })
            }
          />
        </div>
      </div>
      <div className="project-description-section">
        <textarea
          className={`project-description project-description-children custom-input ${
            isEditable && "is-editable"
          } ${loading && "loader"}`}
          value={projectDetails.description}
          readOnly={!isEditable}
          onChange={(e) =>
            setProjectDetails({
              ...projectDetails,
              description: e.target.value,
            })
          }
        />
        <div
          className={`project-tech-stack project-description-children ${
            isEditable && "is-editable"
          } ${loading && "loader"}`}
        >
          {sortedSkills.map(([key, value]) => {
            const isActive = projectDetails.techStack.some(
              (skill) => spaceToUnderscore(skill) === spaceToUnderscore(key)
            );

            const handleSkillClick = () => {
              setProjectDetails((prev) => {
                const normalizedKey = underscoreToSpace(key);
                if (prev.techStack.includes(normalizedKey)) {
                  return {
                    ...prev,
                    techStack: prev.techStack.filter(
                      (skill) => skill !== normalizedKey
                    ),
                  };
                } else {
                  return {
                    ...prev,
                    techStack: [...prev.techStack, normalizedKey],
                  };
                }
              });
            };

            return (
              <button
                key={key}
                className={`skill-card ${isActive ? "active-skill-card" : ""} ${
                  isEditable && "is-editable"
                }`}
                onClick={() => {
                  if (isEditable) {
                    handleSkillClick();
                  }
                }}
              >
                <img src={value.image} alt={value.name} />
                <p>{underscoreToSpace(value.name)}</p>
              </button>
            );
          })}
        </div>
      </div>
      <DeleteConfirmation
        onClick={handleDeleteProject}
        isOpen={deleteConfirmation}
        setIsOpen={setDeleteConfirmation}
        loading={loading}
      />
    </div>
  );
};

export default ProjectDetails;
