import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudentAsync } from "../features/SingleStudentSlice";
import {
  selectAllStudents,
  fetchStudentsAsync,
} from "../features/AllStudentsSlice";
import LoadingScreen from "./Load";

/**
 * Component for showing all students in a paginated way
 */
const AllStudents = () => {
  // set states for loading status current campus array and current page
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * function to get the current page from our url bar
   * if no page provided set page to 1
   * @sets our page state to the current number
   * @returns a page number
   */
  const getQueryPage = () => {
    if (!window.location.search) {
      navigate(`/students?page=1`);
      setPage(1);
      return 1;
    } else {
      const searchArr = window.location.search.split("=");
      setPage(Number(searchArr[1]));
      return Number(searchArr[1]);
    }
  };

  // React useEffect hook to fetch our students information from state with a specific query page provided
  useEffect(() => {
    const fetchStudentsInfo = async () => {
      await dispatch(fetchStudentsAsync(getQueryPage()));
      setLoadingStatus(false);
    };
    fetchStudentsInfo();
  }, [dispatch]);

  /**
   * function to handle our pagination clicks
   * @param {onClick} event specific value if previous or next buttons are clicked
   * @dispatches our fetchStudents action to the store for the next or previous page
   */
  const handlePageChange = (event) => {
    if (event.target.value === "previous") {
      const goToPage = getQueryPage() - 1;
      dispatch(fetchStudentsAsync(goToPage));
      setPage(goToPage);
      navigate(`/students?page=${goToPage}`);
    } else if (event.target.value === "next") {
      const goToPage = getQueryPage() + 1;
      dispatch(fetchStudentsAsync(goToPage));
      setPage(goToPage);
      navigate(`/students?page=${goToPage}`);
    }
  };

  // React useSelector hook to grab current state information
  const studentsInfo = useSelector(selectAllStudents);

  // React useEffect hook to set the local students state to the state grabbed from the Redux store
  useEffect(() => {
    setStudents(studentsInfo);
  }, [studentsInfo]);

  /**
   * Event handler function that handles our student deletion process
   * @fires when delete button is clicked
   * @param {number} id represents the selected student Id
   * @dispatches an action to the Redux store to delete the student
   * @fetches the most recent data
   */
  const handleStudentDelete = async (id) => {
    setLoadingStatus(true);
    await dispatch(deleteStudentAsync(id));
    await dispatch(fetchStudentsAsync(getQueryPage()));
    setLoadingStatus(false);
  };

  return (
    <main>
      {loadingStatus && <LoadingScreen />}
      <Link to="/students/add-student">
        <button className="add-button">Add Student</button>
      </Link>
      <ul className="student-list">
        {students && students.length
          ? students.map((student) => {
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
        <p>{page} </p>
        {page < 14 && (
          <button value="next" onClick={(e) => handlePageChange(e, "next")}>
            {`>>`}
          </button>
        )}
      </div>
    </main>
  );
};

export default AllStudents;
