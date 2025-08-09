import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Projects from "./components/admin/Projects";
import Skills from "./components/admin/Skills";
import ProjectDetails from "./components/admin/ProjectDetails";
import SkillDetails from "./components/admin/SkillDetails";
import AddNewProject from "./components/admin/AddNewProject";
import AddNewSkill from "./components/admin/AddNewSkill";

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="skills" element={<Skills />} />
          <Route path="skills/:id" element={<SkillDetails />} />
          <Route path="add-project" element={<AddNewProject />} />
          <Route path="add-skill" element={<AddNewSkill />} />
        </Route>
      </Routes>
    </Provider>
  );
};

export default App;
