import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleStudent,
  selectSingleStudent,
  deleteStudentAsync,
} from "../features/SingleStudentSlice";
import LoadingScreen from "./Load";

/**
 * Component for showing a single student and their assigned campus
 */
const SingleStudent = () => {
  // setting a loadingstatus state to allow to show our loading page
  const [loadingStatus, setLoadingStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // React hook to grab the parameter from the url
  const { studentId } = useParams();

  // React useEffect hook to grab single student data
  useEffect(() => {
    const fetchStudentData = async () => {
      setLoadingStatus(true);
      await dispatch(fetchSingleStudent(studentId));
      setLoadingStatus(false);
    };
    fetchStudentData();
  }, [dispatch, studentId]);

  // React useSelector hook to grab current global state information
  const singleStudent = useSelector(selectSingleStudent);

  // destructuring of our singleStudent object, or if not found an empty object
  const { firstName, lastName, email, imageUrl, gpa, campus } =
    singleStudent || {};

  /**
   * Function that handles student deletion
   * @param {number} id student Id
   * @fires when delete button is clicked
   */
  const handleStudentDelete = async (id) => {
    setLoadingStatus(true);
    await dispatch(deleteStudentAsync(id));
    navigate(`/students?page=1`);
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      {firstName !== undefined ? (
        <div className="single-student">
          <h1 className="student-title">{`${firstName} ${lastName}`}</h1>
          <img
            className="student-img"
            src={imageUrl}
            alt={`${firstName} ${lastName} image`}
          />
          <a
            className="email"
            href={`mailto:${email}`}
          >{`Email ${firstName}`}</a>
          <p>GPA: {gpa}</p>
          <div className="student-card-buttons">
            <Link to={`/students/${studentId}/edit-student`}>
              <button className="edit-button">Edit Student</button>
            </Link>
            <button
              className="delete-button"
              onClick={() => handleStudentDelete(studentId)}
            >
              Remove Student
            </button>
          </div>
          {campus ? (
            <Link className="student-card-link" to={`/campuses/${campus.id}`}>
              <h2 className="campus-title">Campus: {campus.name}</h2>
            </Link>
          ) : (
            <h3>This student is not assigned to a campus</h3>
          )}
        </div>
      ) : (
        <h1>Student not found</h1>
      )}
    </main>
  );
};

export default SingleStudent;
