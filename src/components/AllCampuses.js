import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCampusesAsync,
  selectAllCampuses,
} from "../features/AllCampusesSlice";
import { deleteCampusAsync } from "../features/SingleCampusSlice";
import LoadingScreen from "./Load";

/**
 * Component for showing all campuses in a paginated way
 */
const AllCampuses = () => {
  // set states for loading status current campus array and current page
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [campuses, setCampuses] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * function to get the current page from our url bar
   * this enables us to type a number into the url bar and go to that page without having to click on the pagination buttons
   * if no page provided set page to 1
   * @sets our page state to the current number
   * @returns a page number
   */
  const getQueryPage = () => {
    if (!window.location.search) {
      navigate(`/campuses?page=1`);
      setPage(1);
      return 1;
    } else {
      const searchArr = window.location.search.split("=");
      setPage(Number(searchArr[1]));
      return Number(searchArr[1]);
    }
  };

  // React useEffect hook to fetch our campuses information from state with a specific query page provided
  useEffect(() => {
    const fetchCampusesInfo = async () => {
      await dispatch(fetchCampusesAsync(getQueryPage()));
      setLoadingStatus(false);
    };
    fetchCampusesInfo();
  }, [dispatch]);

  /**
   * function to handle our pagination clicks
   * @param {onClick} event specific value if previous or next buttons are clicked
   * @dispatches our fetchCampuses action to the store for the next or previous page
   */
  const handlePageChange = (event) => {
    if (event.target.value === "previous") {
      const goToPage = getQueryPage() - 1;
      dispatch(fetchCampusesAsync(goToPage));
      setPage(goToPage);
      navigate(`/campuses?page=${goToPage}`);
    } else if (event.target.value === "next") {
      const goToPage = getQueryPage() + 1;
      dispatch(fetchCampusesAsync(goToPage));
      setPage(goToPage);
      navigate(`/campuses?page=${goToPage}`);
    }
  };

  // React useSelector hook to grab current state information
  const campusesInfo = useSelector(selectAllCampuses);

  // React useEffect hook to set the local campuses state to the state grabbed from the Redux store
  useEffect(() => {
    setCampuses(campusesInfo);
  }, [campusesInfo]);

  /**
   * Event handler function that handles our campus deletion process
   * @fires when delete button is clicked
   * @param {number} id represents the selected campus Id
   * @dispatches an action to the Redux store to delete the campus
   * @fetches the most recent data
   */
  const handleCampusDelete = async (id) => {
    setLoadingStatus(true);
    await dispatch(deleteCampusAsync(id));
    await dispatch(fetchCampusesAsync(getQueryPage()));
    setLoadingStatus(false);
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      <Link to="/campuses/add-campus">
        <button className="add-button">Add Campus</button>
      </Link>
      <ul className="campus-list">
        {campuses && campuses.length
          ? campuses.map((campus) => {
              return (
                <li className="campus-card" key={campus.id}>
                  <Link
                    className="campus-card-link"
                    to={`/campuses/${campus.id}`}
                  >
                    <h2 className="campus-name">{campus.name}</h2>
                    <img
                      className="campus-card-img"
                      src={campus.imageUrl}
                      alt={`${campus.name} image`}
                    />
                  </Link>
                  <div className="campus-card-buttons">
                    <Link to={`/campuses/${campus.id}/edit-campus`}>
                      <button className="edit-button">Edit Campus</button>
                    </Link>
                    <button
                      className="delete-button"
                      onClick={() => handleCampusDelete(campus.id)}
                    >
                      Remove Campus
                    </button>
                  </div>
                </li>
              );
            })
          : null}
      </ul>
      <div className="pagination">
        {page > 1 && (
          <button
            value="previous"
            onClick={(e) => handlePageChange(e, "previous")}
          >
            {`<<`}
          </button>
        )}
        <p>{page}</p>
        {page < 12 && (
          <button value="next" onClick={(e) => handlePageChange(e, "next")}>
            {`>>`}
          </button>
        )}
      </div>
    </main>
  );
};

export default AllCampuses;
