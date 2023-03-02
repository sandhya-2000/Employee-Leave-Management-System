import React from "react";
import RegistrationForm from './Components/RegistrationForm';
import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./Components/Landingpage";
import Login from "./Components/Login";
import EmployeePage from "./Components/EmployeePage";
import ManagerPage from "./Components/ManagerPage";
import AppliedLeaves from "./Components/AppliedLeaves"

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Login" element={<Login />} /> 
          <Route path="/RegistrationForm" element={<RegistrationForm />} />      
          <Route path="/EmployeePage" element={<EmployeePage />} /> 
          <Route path="/ManagerPage" element={<ManagerPage />} />    
          <Route path="/AppliedLeaves" element={<AppliedLeaves />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;