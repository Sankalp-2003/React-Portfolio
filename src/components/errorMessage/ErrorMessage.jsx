/* eslint-disable react/prop-types */
import "./errorMessage.scss";
const ErrorMessage = ({ error }) => {
  if (!error) {
    return null;
  }
  return <p className="errorMessage">{error}</p>;
};

export default ErrorMessage;
