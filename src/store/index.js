import { configureStore } from "@reduxjs/toolkit";

// import created slices
import AllCampusesSlice from "../features/AllCampusesSlice";
import SingleCampusSlice from "../features/SingleCampusSlice";
import AllStudentsSlice from "../features/AllStudentsSlice";
import SingleStudentSlice from "../features/SingleStudentSlice";

const store = configureStore({
  reducer: {
    campuses: AllCampusesSlice,
    singleCampus: SingleCampusSlice,
    students: AllStudentsSlice,
    singleStudent: SingleStudentSlice,
  },
});

export default store;
