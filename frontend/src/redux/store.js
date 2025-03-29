// Import configureStore function from Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import individual reducer slices for different features
import { userReducer } from './userRelated/userSlice';
import { studentReducer } from './studentRelated/studentSlice';
import { noticeReducer } from './noticeRelated/noticeSlice';
import { sclassReducer } from './sclassRelated/sclassSlice';
import { teacherReducer } from './teacherRelated/teacherSlice';
import { complainReducer } from './complainRelated/complainSlice';

// Create and configure the Redux store
const store = configureStore({
    // Combine all reducers into a single root reducer
    reducer: {
        user: userReducer,      // Handles user-related state
        student: studentReducer, // Handles student-related state
        teacher: teacherReducer, // Handles teacher-related state
        notice: noticeReducer,   // Handles notice/announcement-related state
        complain: complainReducer, // Handles complaint-related state
        sclass: sclassReducer    // Handles school class-related state
    },
});

// Export the configured store to be used in the application
export default store;
