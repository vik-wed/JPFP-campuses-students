// Create a slice for All campuses to be imported into Redux store
// slice will manage all campuses state
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * async thunk that fetches page specific data through an AJAX request
 * @param {number} page pagenumber to request that specific piece of the database
 * @returns campus data it received from the AJAX request
 * @catches error if database request goes wrong
 */
export const fetchCampusesAsync = createAsyncThunk(
  "campuses/fetchCampuses",
  async (page) => {
    try {
      const { data } = await axios.get(`/api/campuses?page=${page}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * async thunk that adds a campus to the database through an AJAX request
 * @param {object} campusInfo information to send to the database to create a new campus
 * @returns campus data it received once campus has been created
 * @catches error if database request goes wrong
 */
export const addCampusAsync = createAsyncThunk(
  "campuses/addCampus",
  async (campusInfo) => {
    try {
      const { data } = await axios.post("/api/campuses", campusInfo);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * allCampuses slice
 * initialState is set as an empty array
 * our async reducers are firing whenever our async thunks fulfill the request
 * fetchCampuses returns our entire campus array we received from the database
 * addCampus pushes the newly created campus into our array
 */
export const allCampusesSlice = createSlice({
  name: "campuses",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCampusesAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(addCampusAsync.fulfilled, (state, { payload }) => {
      state.push(payload);
    });
  },
});

/**
 * selector function that allows us to access state by dispatching an action to the store
 * @param {object[]} state campus state array of objects
 * @returns the campuses stored in state
 */
export const selectAllCampuses = (state) => {
  return state.campuses;
};

// exporting our reducers to be accesible from our redux store
export default allCampusesSlice.reducer;
