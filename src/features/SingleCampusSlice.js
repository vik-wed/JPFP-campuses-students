// Create a slice for a single campus to be imported into Redux store
// slice will manage the state and include information on students as well
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * async thunk that fetches a single campus through an AJAX request with a specific campus id
 * @param {number} id campusId parameter
 * @returns campus data it received from the AJAX request
 * @catches error if campus is not found in the database
 */
export const fetchSingleCampus = createAsyncThunk(
  "singleCampus",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/campuses/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * async thunk that updates a single campus through an AJAX request with a campus id and updated campus data
 * @param {object} updateInfo campus object including id and other update info
 * @returns campus data it received from the AJAX request
 * @catches error if campus is not found in the database
 */
export const updateSingleCampus = createAsyncThunk(
  "updateSingleCampus",
  async (updateInfo) => {
    try {
      const { data } = await axios.put(
        `/api/campuses/${updateInfo.campusId}`,
        updateInfo
      );
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * async thunk that deletes a single campus through an AJAX request with a campus id
 * @param {number} id campusId to target specific campus in the database
 * @returns a promise resolve it received from the AJAX request
 * @catches error if campus is not found in the database
 */
export const deleteCampusAsync = createAsyncThunk(
  "deleteCampus",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/campuses/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * singleCampus slice
 * initialState is set as an empty object
 * our async reducers are firing whenever our async thunks fulfill the request and set our state as the current campus
 * except for the deletion where we are returning an empty object
 */
export const singleCampusSlice = createSlice({
  name: "singleCampus",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleCampus.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(updateSingleCampus.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(deleteCampusAsync.fulfilled, (state, { payload }) => {
      return {};
    });
  },
});

/**
 * selector function that allows us to access state by dispatching an action to the store
 * @param {object} state campus state object
 * @returns the single campus object stored in state
 */
export const selectSingleCampus = (state) => {
  return state.singleCampus;
};

// exporting our reducers to be accesible from our redux store
export default singleCampusSlice.reducer;
