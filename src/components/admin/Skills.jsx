// @ts-nocheck
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSkills } from "../../redux/slices/skillSlice";
import RectangularLoader from "../loaders/RectangularLoader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import "./skills.scss";

const Skills = () => {
  const { skills, loading, error } = useSelector((state) => state.skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSkills());
  }, [dispatch]);
  return (
    <div className="admin-skills">
      <h1 className="skill-title">Skills</h1>

      <div className="skill-cards-container">
        {loading ? (
          Array.from({ length: 20 }).map((_, index) => (
            <RectangularLoader key={index} />
          ))
        ) : error ? (
          <ErrorMessage error={error?.message} />
        ) : (
          skills.map((skill, index) => (
            <button
              onClick={() => navigate(`${skill._id}`)}
              className="skill-card"
              key={index}
            >
              <img src={skill.icon} alt={skill.title} />
              <div>
                <h3>{skill.title}</h3>
                <p>Proficiency: {skill.percentage}%</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Skills;
