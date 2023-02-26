import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudentAsync } from "../features/AllStudentsSlice";
import LoadingScreen from "./Load";

/**
 * Component to add a student to the database
 * @component shows a controlled react form
 */
const AddStudent = () => {
  // setting state to create a controlled react form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState(0.0);
  // setting a loadingstatus state to allow to show our loading page
  const [loadingStatus, setLoadingStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Form submit event handler
   * @param {onSubmit} event
   * @fires when submit button is clicked
   * @dispatches an action to the Redux store to add a student to the database
   * @navigates us back to the last student page to view our newly created student
   */
  const handleAddStudentSubmit = async (event) => {
    event.preventDefault();
    setLoadingStatus(true);
    imageUrl === ""
      ? await dispatch(addStudentAsync({ firstName, lastName, email, gpa }))
      : await dispatch(
          addStudentAsync({ firstName, lastName, email, imageUrl, gpa })
        );
    navigate("/students?page=1");
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      <h1 className="form-title">Add a Student</h1>
      <form className="form" onSubmit={handleAddStudentSubmit}>
        <label htmlFor="firstName">Student's First Name:</label>
        <input
          name="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          name="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="email">E-Mail Address:</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="imageUrl">Image:</label>
        <input
          name="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label htmlFor="gpa">GPA:</label>
        <input
          name="gpa"
          type="number"
          step="0.1"
          min="0.0"
          max="4.0"
          value={gpa}
          onChange={(e) => setGpa(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
        <Link className="cancel-link" to="/students?page=1">
          Cancel
        </Link>
      </form>
      <img
        className="add-img"
        src="https://img.freepik.com/free-vector/critical-thinking-concept-illustration_114360-7992.jpg"
        alt="building illustration"
      />
    </main>
  );
};

export default AddStudent;
