/* eslint-disable react/prop-types */
import { FaSave } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { MdOutlineModeEdit } from "react-icons/md";
import "./editSaveCancelButton.scss";

const EditSaveCancelButton = ({
  isEditable,
  isEdited,
  isLoading,
  hasItem,
  onEditToggle,
  onSave,
}) => {
  const handleClick = () => {
    if (isEdited) {
      onSave();
    } else {
      onEditToggle();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`editSaveCancelButton ${
        isEdited && hasItem ? "save-button" : ""
      }`}
    >
      {isEditable && !isEdited ? (
        <>
          <ImCancelCircle /> Cancel
        </>
      ) : isEdited && hasItem ? (
        <>
          <FaSave /> {isLoading ? "Saving..." : "Save"}
        </>
      ) : (
        <>
          <MdOutlineModeEdit /> Edit
        </>
      )}
    </button>
  );
};

export default EditSaveCancelButton;
