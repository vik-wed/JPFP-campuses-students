import React from "react";
import { Link } from "react-router-dom";

/**
 * Component for showing our homepage
 */
const Home = () => {
  return (
    <main>
      <h1 className="home-title">
        Welcome to the
        <br />
        <span>Movie & TV Show</span> <br />
        School District
      </h1>
      <img
        src="https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10508.jpg"
        alt="Illustration of a University and students"
      />
      <h2 className="home-subtitle">
        Please select from{" "}
        <Link className="home-links" to="/campuses?page=1">
          Campuses
        </Link>{" "}
        or{" "}
        <Link className="home-links" to="/students?page=1">
          Students
        </Link>{" "}
        to learn more
      </h2>
    </main>
  );
};

export default Home;
