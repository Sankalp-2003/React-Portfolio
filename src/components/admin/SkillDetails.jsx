// @ts-nocheck
import { useNavigate, useParams } from "react-router-dom";
import "./skillDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteSkill,
  getSkillById,
  getSkillImages,
  updateSkill,
} from "../../redux/slices/skillSlice";
import ErrorMessage from "../errorMessage/ErrorMessage";
import EditSaveCancelButton from "../common/EditSaveCancelButton";
import { MdDelete, MdOutlineModeEdit } from "react-icons/md";
import formatDate from "../utils/formatDate";
import DeleteConfirmation from "../popups/DeleteConfirmation";

const SkillDetails = () => {
  const [skillDetails, setSkillDetails] = useState({
    title: "",
    percentage: 0,
    icon: "",
    positions: {
      xl: 0,
      yl: 0,
      xs: 0,
      ys: 0,
    },
  });
  const [isEditable, setIsEditable] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { skill, error, loading } = useSelector((state) => state.skills);
  const navigate = useNavigate();

  const isEdited =
    skillDetails?.title !== skill?.title ||
    skillDetails?.percentage !== skill?.percentage ||
    skillDetails?.icon !== skill?.icon ||
    JSON.stringify(skillDetails?.positions) !==
      JSON.stringify(skill?.positions);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSkillDetails((prev) => ({
        ...prev,
        icon: file,
      }));
    }
  };

  const handleUpdateSkill = async () => {
    try {
      await dispatch(updateSkill({ id, skillData: skillDetails }));
      dispatch(getSkillById(id));

      setIsEditable(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleDeleteSkill = async () => {
    try {
      await dispatch(deleteSkill(id));
      dispatch(getSkillImages());
      navigate("/admin/skills");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  useEffect(() => {
    dispatch(getSkillById(id));
  }, [dispatch]);

  useEffect(() => {
    if (skill) {
      setSkillDetails({
        title: skill.title || "",
        percentage: skill.percentage || 0,
        icon: skill.icon || "",
        positions: skill.positions || {},
      });
    }
  }, [skill]);

  return (
    <div className="skill-details">
      <div className="title-and-buttons-container">
        <h1 className="skill-details-title">Skill Details</h1>

        <ErrorMessage error={error?.message} />

        <div className="buttons-container">
          <EditSaveCancelButton
            hasItem={skill}
            isEditable={isEditable}
            isEdited={isEdited}
            isLoading={loading}
            onEditToggle={() => setIsEditable(!isEditable)}
            onSave={handleUpdateSkill}
          />
          <button
            className="delete-button"
            onClick={() => setShowDeleteConfirmation(true)}
          >
            <MdDelete /> Delete
          </button>
        </div>
      </div>

      <div className="skill-details-content">
        <div className="skill-details-row-1">
          <div className="row-1 image-and-title">
            <div
              className={`skill-details-image ${isEditable && "is-editable"} ${
                loading && "loader"
              }`}
            >
              {!loading && (
                <img
                  src={
                    typeof skillDetails.icon === "string"
                      ? skillDetails.icon
                      : URL.createObjectURL(skillDetails.icon)
                  }
                  alt="Skill Icon"
                />
              )}
              {isEditable && (
                <label htmlFor="skill-icon">
                  <MdOutlineModeEdit />
                </label>
              )}
              <input
                type="file"
                id="skill-icon"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </div>
            <input
              type="text"
              value={skillDetails.title}
              className={`input ${isEditable && "is-editable"}`}
              readOnly={!isEditable}
              onChange={(e) =>
                setSkillDetails({ ...skillDetails, title: e.target.value })
              }
            />
            <h4>
              Proficiency:{" "}
              <input
                type="text"
                className={`input ${isEditable && "is-editable"}`}
                value={skillDetails.percentage}
                readOnly={!isEditable}
                onChange={(e) =>
                  setSkillDetails({
                    ...skillDetails,
                    percentage: e.target.value,
                  })
                }
              />
              %
            </h4>
          </div>

          <div className="row-1 positions-container">
            <h4 className="position-title">Positions</h4>
            <div className={`positions ${isEditable && "is-editable"}`}>
              <label>XL</label>
              <input
                type="text"
                value={skillDetails.positions.xl}
                className="input"
                readOnly={!isEditable}
                onChange={(e) =>
                  setSkillDetails({
                    ...skillDetails,
                    positions: {
                      ...skillDetails.positions,
                      xl: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className={`positions ${isEditable && "is-editable"}`}>
              <label>YL</label>
              <input
                type="text"
                value={skillDetails.positions.yl}
                className="input"
                readOnly={!isEditable}
                onChange={(e) =>
                  setSkillDetails({
                    ...skillDetails,
                    positions: {
                      ...skillDetails.positions,
                      yl: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className={`positions ${isEditable && "is-editable"}`}>
              <label>XS</label>
              <input
                type="text"
                value={skillDetails.positions.xs}
                className="input"
                readOnly={!isEditable}
                onChange={(e) =>
                  setSkillDetails({
                    ...skillDetails,
                    positions: {
                      ...skillDetails.positions,
                      xs: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className={`positions ${isEditable && "is-editable"}`}>
              <label>YS</label>
              <input
                type="text"
                value={skillDetails.positions.ys}
                className="input"
                readOnly={!isEditable}
                onChange={(e) =>
                  setSkillDetails({
                    ...skillDetails,
                    positions: {
                      ...skillDetails.positions,
                      ys: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        {skill?.updatedAt && (
          <div className="skill-detail-row-2">
            <div className="data-and-time">
              <h3>Last Updated on: {formatDate(skill?.updatedAt)}</h3>
            </div>
          </div>
        )}
      </div>
      <DeleteConfirmation
        isOpen={showDeleteConfirmation}
        loading={loading}
        onClick={handleDeleteSkill}
        setIsOpen={setShowDeleteConfirmation}
      />
    </div>
  );
};

export default SkillDetails;
