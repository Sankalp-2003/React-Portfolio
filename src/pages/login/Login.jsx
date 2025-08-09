// @ts-nocheck
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/authSlice";
import "./login.scss";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);
  return (
    <div className="login-container">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Login</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
          <button
            className="home-btn"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </form>
        <ErrorMessage error={error?.message} />
      </div>
    </div>
  );
};

export default Login;
