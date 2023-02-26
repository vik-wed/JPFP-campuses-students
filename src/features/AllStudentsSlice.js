// Create a slice for All students to be imported into Redux store
// slice will manage all students state
import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/**
 * async thunk that fetches page specific data through an AJAX request
 * @param {number} page pagenumber to request that specific piece of the database
 * @returns student data it received from the AJAX request
 * @catches error if database request goes wrong
 */
export const fetchStudentsAsync = createAsyncThunk(
  "students/fetchStudents",
  async (page) => {
    try {
      const { data } = await axios.get(`/api/students?page=${page}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * async thunk that adds a student to the database through an AJAX request
 * @param {object} studentInfo information to send to the database to create a new student
 * @returns student data it received once student has been created
 * @catches error if database request goes wrong
 */
export const addStudentAsync = createAsyncThunk(
  "students/addStudent",
  async (studentInfo) => {
    try {
      const { data } = await axios.post("/api/students", studentInfo);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

/**
 * allStudents slice
 * initialState is set as an empty array
 * our async reducers are firing whenever our async thunks fulfill the request
 * fetchStudents returns our entire student array we received from the database
 * addStudents pushes the newly created student into our array
 */
export const allStudentsSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudentsAsync.fulfilled, (state, { payload }) => {
      return payload;
    });
    builder.addCase(addStudentAsync.fulfilled, (state, { payload }) => {
      state.push(payload);
    });
  },
});

/**
 * selector function that allows us to access state by dispatching an action to the store
 * @param {object[]} state student state array of objects
 * @returns the students stored in state
 */
export const selectAllStudents = (state) => {
  return state.students;
};

// exporting our reducers to be accesible from our redux store
export default allStudentsSlice.reducer;
