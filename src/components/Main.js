import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

// import other React components:
import Home from "./Home";
import AllCampuses from "./AllCampuses";
import SingleCampus from "./SingleCampus";
import AddCampus from "./AddCampus";
import EditCampus from "./EditCampus";
import AllStudents from "./AllStudents";
import SingleStudent from "./SingleStudent";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import NotFound from "./404";

/**
 * Component for showing our main page, including the navbar
 * stores routes
 */
const Main = () => {
  return (
    <div>
      <nav className="navigation">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <div className="right-nav">
          <Link className="nav-link" to="/campuses?page=1">
            Campuses
          </Link>
          <Link className="nav-link" to="/students?page=1">
            Students
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campuses" element={<AllCampuses />} />
        <Route path="/campuses/:campusId" element={<SingleCampus />} />
        <Route
          path="/campuses/:campusId/edit-campus"
          element={<EditCampus />}
        />
        <Route path="/campuses/add-campus" element={<AddCampus />} />
        <Route path="/students" element={<AllStudents />} />
        <Route path="/students/:studentId" element={<SingleStudent />} />
        <Route path="/students/add-student" element={<AddStudent />} />
        <Route
          path="/students/:studentId/edit-student"
          element={<EditStudent />}
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Main;
