import React from "react";
import { Link } from "react-router-dom";

/**
 * Component for showing an error/404 page
 */
const NotFound = () => {
  return (
    <main className="not-found">
      <img className="img404"
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7888.jpg"
        alt="Page not found"
      />
      <Link to="/">
        <button className="button404">Go Home</button>
      </Link>
    </main>
  );
};

export default NotFound;
