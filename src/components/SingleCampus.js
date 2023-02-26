import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSingleCampus,
  selectSingleCampus,
  deleteCampusAsync,
} from "../features/SingleCampusSlice";
import { deleteStudentAsync } from "../features/SingleStudentSlice";
import LoadingScreen from "./Load";

/**
 * Component for showing a single campus, includes all assigned students
 */
const SingleCampus = () => {
  // setting a loadingstatus state to allow to show our loading page
  const [loadingStatus, setLoadingStatus] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // React hook to grab the parameter from the url
  const { campusId } = useParams();

  // React useEffect hook to grab single campus data
  useEffect(() => {
    const fetchCampusData = async () => {
      setLoadingStatus(true);
      await dispatch(fetchSingleCampus(campusId));
      setLoadingStatus(false);
    };
    fetchCampusData();
  }, [dispatch, campusId]);

  // React useSelector hook to grab current global state information
  const singleCampus = useSelector(selectSingleCampus);

  // destructuring of our singleCampus object, or if not found an empty object
  const { name, imageUrl, address, description, students } = singleCampus || {};

  /**
   * Function that handles campus deletion
   * @param {number} id campus Id
   * @fires when delete button is clicked
   */
  const handleCampusDelete = async (id) => {
    setLoadingStatus(true);
    await dispatch(deleteCampusAsync(id));
    navigate(`/campuses?page=1`);
  };

  /**
   * Function that handles student deletion
   * @param {number} id student Id
   * @fires when delete button is clicked
   */
  const handleStudentDelete = async (id) => {
    setLoadingStatus(true);
    await dispatch(deleteStudentAsync(id));
    await dispatch(fetchSingleCampus(campusId));
    setLoadingStatus(false);
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      {name !== undefined ? (
        <div className="single-campus">
          <h1 className="campus-title">{name}</h1>
          <img
            className="campus-card-img"
            src={imageUrl}
            alt={`${name} image`}
          />
          <div className="single-campus-info">
            <h2>{address}</h2>
            <p>{description}</p>
          </div>
          <div className="campus-card-buttons">
            <Link to={`/campuses/${campusId}/edit-campus`}>
              <button className="edit-button">Edit Campus</button>
            </Link>
            <button
              className="delete-button"
              onClick={() => handleCampusDelete(campusId)}
            >
              Delete Campus
            </button>
          </div>
          <div className="single-campus-students">
            <h2 className="campus-title">Students</h2>
            {students && students.length ? (
              <ul className="student-list">
                {students.map((student) => {
                  return (
                    <li className="student-card" key={student.id}>
                      <Link
                        className="student-card-link"
                        to={`/students/${student.id}`}
                      >
                        <h2 className="student-name">{`${student.firstName} ${student.lastName}`}</h2>
                      </Link>
                      <button
                        className="delete-button"
                        onClick={() => handleStudentDelete(student.id)}
                      >
                        Remove Student
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              "No Students on this Campus"
            )}
          </div>
        </div>
      ) : (
        <h1>Campus not found</h1>
      )}
    </main>
  );
};

export default SingleCampus;
