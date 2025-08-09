/* eslint-disable react/prop-types */
import "./deleteConfirmation.scss";

const DeleteConfirmation = ({ isOpen, onClick, setIsOpen, loading }) => {
  if (!isOpen) return null;
  return (
    <div className="popup-container" onClick={() => setIsOpen(false)}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Are you sure you want to delete this project?</h3>
        <div className="buttons">
          <button className="cancel btn" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button className="delete btn" onClick={onClick}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
