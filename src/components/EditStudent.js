// FUTURE TODO: create select for campuses
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSingleStudent,
  fetchSingleStudent,
  selectSingleStudent,
} from "../features/SingleStudentSlice";
import LoadingScreen from "./Load";

/**
 * Component for showing an edit student page (including campus assigned to this student)
 */
const EditStudent = () => {
  // set state for form components to create a controlled React form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [gpa, setGpa] = useState(0.0);
  const [campus, setCampus] = useState({});
  // setting a loadingstatus state to allow to show our loading page
  const [loadingStatus, setLoadingStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // React hook to grab the parameter from the url
  const { studentId } = useParams();
  // React useSelector hook to grab current state information
  const student = useSelector(selectSingleStudent);

  // React useEffect hook to fetch our current student information from state
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoadingStatus(true);
      await dispatch(fetchSingleStudent(studentId));
      setLoadingStatus(false);
    };
    fetchStudentData();
  }, [dispatch, studentId]);

  // React useEffect hook to set all state values to the current values we received from global state
  useEffect(() => {
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setEmail(student.email);
    setImageUrl(student.imageUrl);
    setGpa(student.gpa);
    setCampus(student.campus);
  }, [student]);

  /**
   * Event handler function that handles our student edit process
   * @fires when edit button is clicked
   * @param {onSubmit} event
   * @dispatches an action to the redux store to update the student information
   * reloads the updated student
   */
  const handleEditStudentSubmit = async (event) => {
    event.preventDefault();
    setLoadingStatus(true);
    const id = studentId;
    await dispatch(
      updateSingleStudent({ id, firstName, lastName, email, imageUrl, gpa })
    );
    navigate(`/students/${studentId}`);
  };

  /**
   * Event handler function that handles our student unregister process
   * @fires when unregister button is clicked
   * @dispatches an action to the Redux store to remove the campus data from the selected student
   * @fetches the most recent data
   */
  const handleCampusUnregister = async () => {
    setLoadingStatus(true);
    const campus = null;
    const campusId = null;
    await dispatch(updateSingleStudent({ id: studentId, campus, campusId }));
    await dispatch(fetchSingleStudent(studentId));
    setLoadingStatus(false);
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      <h1 className="form-title">Edit Student</h1>
      <form className="form" onSubmit={handleEditStudentSubmit}>
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
        <Link className="cancel-link" to={`/students/${studentId}`}>
          Cancel
        </Link>
      </form>
      {campus ? (
        <div className="campus-card">
          <h2 className="student-name">Campus: {campus.name}</h2>
          <button className="delete-button" onClick={handleCampusUnregister}>
            Unregister
          </button>
        </div>
      ) : (
        "This student is not assigned to a campus"
      )}
    </main>
  );
};

export default EditStudent;
