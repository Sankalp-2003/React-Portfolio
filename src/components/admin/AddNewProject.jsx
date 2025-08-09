// @ts-nocheck
import { FaGithub } from "react-icons/fa";
import "./addNewProject.scss";
import { HiStatusOnline } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSkillImages } from "../../redux/slices/skillSlice";
import {
  getSortedSkills,
  spaceToUnderscore,
  underscoreToSpace,
} from "../utils/utilities";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { createProject } from "../../redux/slices/projectSlice";
import { useNavigate } from "react-router-dom";

const AddNewProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    para: "",
    git: "",
    link: "",
    thumbnail: "",
    description: "",
    techStack: [],
  });
  const { skillImages } = useSelector((state) => state.skills);
  const { loading, error } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        thumbnail: file,
      }));
    }
  };

  const sortedSkills = getSortedSkills(skillImages, formData.techStack);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(createProject(formData));

      if (createProject.fulfilled.match(resultAction)) {
        const newProjectId = resultAction.payload._id;

        setFormData({
          title: "",
          name: "",
          para: "",
          git: "",
          link: "",
          thumbnail: "",
          description: "",
          techStack: [],
        });

        navigate(`/admin/projects/${newProjectId}`);
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  useEffect(() => {
    dispatch(getSkillImages());
  }, [dispatch]);

  return (
    <form onSubmit={handleFormSubmit} className="add-project-form">
      <h1 className="add-project-title">Add a New Project</h1>

      <div className="add-project-from-content">
        <div className="add-project-row-1">
          <div className="row-1">
            <label className="label">Project Title</label>
            <input
              type="text"
              className="input"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="row-1">
            <label className="label">Project Name</label>
            <input
              type="text"
              className="input"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="row-1">
            <label className="label">Project Para</label>
            <input
              type="text"
              className="input"
              value={formData.para}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  para: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="add-project-row-2">
          <label className="label">
            <FaGithub />
          </label>
          <input
            type="text"
            className="input"
            value={formData.git}
            onChange={(e) =>
              setFormData({
                ...formData,
                git: e.target.value,
              })
            }
          />
        </div>

        <div className="add-project-row-2">
          <label className="label">
            <HiStatusOnline />
          </label>
          <input
            type="text"
            className="input"
            value={formData.link}
            onChange={(e) =>
              setFormData({
                ...formData,
                link: e.target.value,
              })
            }
          />
        </div>

        <div className="add-project-row-3">
          <div className="row-3">
            <label className="label">Project Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="row-3">
            <label className="label">Project Tech Stack</label>
            <div className="add-project-tech-stack">
              {sortedSkills.map(([key, value]) => {
                const isActive = formData.techStack.some(
                  (skill) => spaceToUnderscore(skill) === spaceToUnderscore(key)
                );

                const handleSkillClick = () => {
                  setFormData((prev) => {
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
                    className={`skill-card ${
                      isActive ? "active-skill-card" : ""
                    }`}
                    onClick={handleSkillClick}
                    type="button"
                  >
                    <img src={value.image} alt={value.name} />
                    <p>{underscoreToSpace(value.name)}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="add-project-row-4">
          <div className="add-project-select-image">
            <label htmlFor="add-project-image">Select Thumbnail</label>
            <input
              type="file"
              id="add-project-image"
              onChange={handleThumbnailChange}
              accept="image/*"
              hidden
            />
            <img
              src={
                typeof formData.thumbnail === "string"
                  ? formData.thumbnail
                  : URL.createObjectURL(formData.thumbnail)
              }
              className="selected-image"
            />
            <ErrorMessage error={error?.message} />
          </div>

          <button>{loading ? "Adding..." : "Add Project"}</button>
        </div>
      </div>
    </form>
  );
};

export default AddNewProject;
