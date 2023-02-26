import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCampusAsync } from "../features/AllCampusesSlice";
import LoadingScreen from "./Load";

/**
 * Component to add a campus to the database
 * @component shows a controlled react form
 */
const AddCampus = () => {
  // setting state to create a controlled react form
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  // setting a loadingstatus state to allow to show our loading page
  const [loadingStatus, setLoadingStatus] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * Form submit event handler
   * @param {onSubmit} event
   * @fires when submit button is clicked
   * @dispatches an action to the Redux store to add a campus to the database
   * @navigates us back to the last campus page to view our newly created campus
   */
  const handleAddCampusSubmit = async (event) => {
    event.preventDefault();
    setLoadingStatus(true);
    imageUrl === ""
      ? await dispatch(addCampusAsync({ name, address, description }))
      : await dispatch(
          addCampusAsync({ name, imageUrl, address, description })
        );
    navigate("/campuses?page=12");
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      <h1 className="form-title">Add a Campus</h1>
      <form className="form" onSubmit={handleAddCampusSubmit}>
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
        <Link className="cancel-link" to="/campuses?page=1">
          Cancel
        </Link>
      </form>
      <img
        className="add-img"
        src="https://img.freepik.com/free-vector/building-concept-illustration_114360-4469.jpg"
        alt="building illustration"
      />
    </main>
  );
};

export default AddCampus;
