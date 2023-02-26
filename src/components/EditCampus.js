import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSingleCampus,
  fetchSingleCampus,
  selectSingleCampus,
} from "../features/SingleCampusSlice";
import { updateSingleStudent } from "../features/SingleStudentSlice";
import LoadingScreen from "./Load";

/**
 * Component for showing an edit campus page (including students assigned to this campus)
 */
const EditCampus = () => {
  // set state for form components to create a controlled React form
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [students, setStudents] = useState([]);
  // setting a loadingstatus state to allow to show our loading page
  const [loadingStatus, setLoadingStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // React hook to grab the parameter from the url
  const { campusId } = useParams();
  const singleCampusId = campusId;
  // React useSelector hook to grab current state information
  const singleCampus = useSelector(selectSingleCampus);

  // React useEffect hook to fetch our current campus information from state
  useEffect(() => {
    const fetchCampusData = async () => {
      setLoadingStatus(true);
      await dispatch(fetchSingleCampus(singleCampusId));
      setLoadingStatus(false);
    };
    fetchCampusData();
  }, [dispatch]);

  // React useEffect hook to set all state values to the current values we received from global state
  useEffect(() => {
    setName(singleCampus.name);
    setImageUrl(singleCampus.imageUrl);
    setAddress(singleCampus.address);
    setDescription(singleCampus.description);
    setStudents(singleCampus.students);
  }, [singleCampus]);

  /**
   * Event handler function that handles our student unregister process
   * @fires when unregister button is clicked
   * @param {number} id represents the selected student Id
   * @dispatches an action to the Redux store to remove the campus data from the selected student
   * @fetches the most recent data
   */
  const handleStudentUnregister = async (id) => {
    setLoadingStatus(true);
    const campus = null;
    const campusId = null;
    await dispatch(updateSingleStudent({ id, campus, campusId }));
    await dispatch(fetchSingleCampus(singleCampusId));
    setLoadingStatus(false);
  };

  /**
   * Event handler function that handles our campus edit process
   * @fires when edit button is clicked
   * @param {onSubmit} event
   * @dispatches an action to the redux store to update the campus information
   * reloads the updated campus
   */
  const handleEditCampusSubmit = async (event) => {
    event.preventDefault();
    setLoadingStatus(true);
    await dispatch(
      updateSingleCampus({ campusId, name, imageUrl, address, description })
    );
    navigate(`/campuses/${campusId}`);
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      <h1 className="form-title">Edit Campus</h1>
      <form className="form" onSubmit={handleEditCampusSubmit}>
        <label htmlFor="name">Campus Name:</label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="imageUrl">Image:</label>
        <input
          name="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <label htmlFor="address">Address:</label>
        <input
          name="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          className="longer-input"
          name="description"
          rows="5"
          cols="25"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="submit-button" type="submit">
          Submit
        </button>
        <Link className="cancel-link" to={`/campuses/${campusId}`}>
          Cancel
        </Link>
      </form>
      <h2 className="form-title">Students</h2>
      <ul className="student-list">
        {students && students.length
          ? students.map((student) => {
              return (
                <li className="student-card" key={student.id}>
                  <h2 className="student-name">{`${student.firstName} ${student.lastName}`}</h2>
                  <button
                    className="delete-button"
                    onClick={() => handleStudentUnregister(student.id)}
                  >
                    Unregister
                  </button>
                </li>
              );
            })
          : "No Students on this Campus"}
      </ul>
    </main>
  );
};

export default EditCampus;
