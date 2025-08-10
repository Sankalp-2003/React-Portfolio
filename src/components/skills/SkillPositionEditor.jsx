// @ts-nocheck
/* eslint-disable react/prop-types */
import { FaSave } from "react-icons/fa";
import "./skillPositionEditor.scss";
import { IoMdBackspace } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDeviceType } from "../../hooks/useDeviceType";
import { useDispatch, useSelector } from "react-redux";
import { getSkillById, updateSkill } from "../../redux/slices/skillSlice";
import ErrorMessage from "../errorMessage/ErrorMessage";
const SkillPositionEditor = ({ skillId, onClear }) => {
  const [skillData, setSkillData] = useState({
    x: 0,
    y: 0,
  });
  const [percentage, setPercentage] = useState(0);
  const { isMobile, isTab } = useDeviceType();
  const { skill, error } = useSelector((state) => state.skills);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isEdited = !isMobile
    ? skillData.x !== skill?.positions.xl ||
      skillData.y !== skill?.positions.yl ||
      percentage !== skill?.percentage
    : skillData.x !== skill?.positions.xs ||
      skillData.y !== skill?.positions.ys ||
      percentage !== skill?.percentage;

  const handleSave = (e) => {
    e.preventDefault();

    const updatedPositions = {
      ...skill.positions,
      ...(isMobile
        ? { xs: skillData.x, ys: skillData.y }
        : { xl: skillData.x, yl: skillData.y }),
    };

    const formData = new FormData();
    formData.append("percentage", percentage);
    formData.append("positions", JSON.stringify(updatedPositions));

    dispatch(updateSkill({ id: skill._id, skillData: formData }));
  };

  useEffect(() => {
    if (skill) {
      if (isMobile) {
        setSkillData({
          x: skill.positions.xs,
          y: skill.positions.ys,
        });
      } else {
        setSkillData({
          x: skill.positions.xl,
          y: skill.positions.yl,
        });
      }
      setPercentage(skill.percentage);
    }
  }, [isMobile, skill, dispatch]);

  useEffect(() => {
    if (skillId) {
      dispatch(getSkillById(skillId));
    }
  }, [skillId]);

  if (!skillId || isTab || !token) {
    return null;
  }

  return (
    <form onSubmit={handleSave} className="skillPositionEditor">
      <div className="icon-and-title">
        <img src={skill?.icon} alt="skill icon" />
        <h3>{skill?.title}</h3>
        <div className="percentage-container">
          <input
            type="text"
            className="percentage-input"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
          <label>%</label>
        </div>
        {isEdited && (
          <button>
            <FaSave className="save-icon icon" />
          </button>
        )}
        <IoMdBackspace className="clear-icon icon" onClick={onClear} />
      </div>
      <div className="positioning-inputs">
        <div className="input-container">
          <label>X</label>
          <input
            type="text"
            value={skillData.x}
            onChange={(e) =>
              setSkillData({
                ...skillData,
                x: Number(e.target.value),
              })
            }
          />
          <label>Y</label>
          <input
            type="text"
            value={skillData.y}
            onChange={(e) =>
              setSkillData({
                ...skillData,
                y: Number(e.target.value),
              })
            }
          />
        </div>
      </div>
      <ErrorMessage error={error?.message} />
    </form>
  );
};

export default SkillPositionEditor;
