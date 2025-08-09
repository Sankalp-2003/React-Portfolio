// @ts-nocheck
import { useState } from "react";
import "./addNewSkill.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSkill } from "../../redux/slices/skillSlice";
import ErrorMessage from "../errorMessage/ErrorMessage";

const AddNewSkill = () => {
  const [formData, setFormData] = useState({
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
  const { loading, error } = useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        icon: file,
      }));
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("percentage", formData.percentage);
      form.append("icon", formData.icon);
      form.append("positions", JSON.stringify(formData.positions));

      const result = await dispatch(createSkill(form));

      if (createSkill.fulfilled.match(result)) {
        const newSkillId = result.payload._id;

        setFormData({
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

        navigate(`/admin/skills/${newSkillId}`);
      }
    } catch (error) {
      console.error("Failed to create skill:", error);
    }
  };

  return (
    <div className="add-now-skill">
      <h1>Add New Skill</h1>

      <form onSubmit={handleAddSkill}>
        <div className="add-new-skill-row-1">
          <div className="row-1 title">
            <label>Title</label>
            <input
              type="text"
              className="input"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="row-1 percentage">
            <label>Positions</label>
            <div className="positions">
              <label>XL</label>
              <input
                type="text"
                className="input positions-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    positions: {
                      ...formData.positions,
                      xl: e.target.value,
                    },
                  })
                }
              />

              <label>YL</label>
              <input
                type="text"
                className="input positions-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    positions: {
                      ...formData.positions,
                      yl: e.target.value,
                    },
                  })
                }
              />

              <label>XS</label>
              <input
                type="text"
                className="input positions-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    positions: {
                      ...formData.positions,
                      xs: e.target.value,
                    },
                  })
                }
              />

              <label>YS</label>
              <input
                type="text"
                className="input positions-input"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    positions: {
                      ...formData.positions,
                      ys: e.target.value,
                    },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="add-new-skill-row-2">
          <div className="row-2">
            <label>Proficiency</label>
            <input
              type="text"
              className="input"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  percentage: e.target.value,
                })
              }
            />
          </div>
          <div className="row-2">
            <div className="select-icon">
              <label htmlFor="add-skill-icon" className="image-label">
                Choose File
              </label>
              {formData.icon && (
                <img
                  src={
                    typeof formData.icon === "string"
                      ? formData.icon
                      : URL.createObjectURL(formData.icon)
                  }
                  alt="Skill Icon"
                />
              )}
              <input
                type="file"
                id="add-skill-icon"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <button>{loading ? "Adding..." : "Add New Skill"}</button>
        <ErrorMessage error={error?.message} />
      </form>
    </div>
  );
};

export default AddNewSkill;
