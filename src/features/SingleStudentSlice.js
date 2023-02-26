// Create a slice for a single student to be imported into Redux store
// slice will manage state for a single student and include info on the campus
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * async thunk that fetches a single student through an AJAX request with a specific student id
 * @param {number} id studentId parameter
 * @returns student data it received from the AJAX request
 * @catches error if student is not found in the database
 */
export const fetchSingleStudent = createAsyncThunk(
  "students/fetchSingleStudent",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/students/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * async thunk that updates a single student through an AJAX request with a student id and updated student data
 * @param {object} updateInfo student object including id and other update info
 * @returns student data it received from the AJAX request
 * @catches error if student is not found in the database
 */
export const updateSingleStudent = createAsyncThunk(
  "students/updateStudent",
  async (updateInfo) => {
    try {
      const { data } = await axios.put(
        `/api/students/${updateInfo.id}`,
        updateInfo
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * async thunk that deletes a single student through an AJAX request with a student id
 * @param {number} id studentId to target specific student in the database
 * @returns a promise resolve it received from the AJAX request
 * @catches error if student is not found in the database
 */
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/students/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * singleStudent slice
 * initialState is set as an empty object
 * our async reducers are firing whenever our async thunks fulfill the request and set our state as the current student
 * except for the deletion where we are returning an empty object
 */
export const singleStudentSlice = createSlice({
  name: "singleStudent",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleStudent.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(updateSingleStudent.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(deleteStudentAsync.fulfilled, (state, { payload }) => {
      return {};
    });
  },
});

/**
 * selector function that allows us to access state by dispatching an action to the store
 * @param {object} state student state object
 * @returns the single student object stored in state
 */
export const selectSingleStudent = (state) => {
  return state.singleStudent;
};

// exporting our reducers to be accesible from our redux store
export default singleStudentSlice.reducer;
