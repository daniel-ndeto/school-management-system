// Import React's useState hook for managing component state
import { useState } from 'react';
// Import Material UI components for layout, styling, and icons
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
// Import Material UI icons for menu toggling
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// Import routing components from react-router-dom for navigation
import { Navigate, Route, Routes } from 'react-router-dom';
// Import custom styled components for AppBar and Drawer from local styles
import { AppBar, Drawer } from '../../components/styles';
// Import components for logout and sidebar menu functionality
import Logout from '../Logout';
import SideBar from './SideBar';
// Import components for various Admin pages
import AdminProfile from './AdminProfile';
import AdminHomePage from './AdminHomePage';

// Import components related to student management
import AddStudent from './studentRelated/AddStudent';
import SeeComplains from './studentRelated/SeeComplains';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';

// Import components related to notice management
import AddNotice from './noticeRelated/AddNotice';
import ShowNotices from './noticeRelated/ShowNotices';

// Import components related to subject management
import ShowSubjects from './subjectRelated/ShowSubjects';
import SubjectForm from './subjectRelated/SubjectForm';
import ViewSubject from './subjectRelated/ViewSubject';

// Import components related to teacher management
import AddTeacher from './teacherRelated/AddTeacher';
import ChooseClass from './teacherRelated/ChooseClass';
import ChooseSubject from './teacherRelated/ChooseSubject';
import ShowTeachers from './teacherRelated/ShowTeachers';
import TeacherDetails from './teacherRelated/TeacherDetails';

// Import components related to class management
import AddClass from './classRelated/AddClass';
import ClassDetails from './classRelated/ClassDetails';
import ShowClasses from './classRelated/ShowClasses';
// Import the account menu component for user account actions
import AccountMenu from '../../components/AccountMenu';

// AdminDashboard is the main component for the admin panel
const AdminDashboard = () => {
    // State variable to track if the sidebar drawer is open
    const [open, setOpen] = useState(false);
    // Function to toggle the sidebar drawer's open/close state
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* Main container with flex display for layout */}
            <Box sx={{ display: 'flex' }}>
                {/* CssBaseline for consistent styling across browsers */}
                <CssBaseline />
                {/* Custom AppBar component with conditional styling based on drawer state */}
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        {/* IconButton to open the drawer; hidden when drawer is open */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }), // Hide button when drawer is open
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Typography component displaying the dashboard title */}
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Admin Dashboard
                        </Typography>
                        {/* AccountMenu for user account related actions */}
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                {/* Custom Drawer component for sidebar navigation */}
                <Drawer
                    variant="permanent"
                    open={open}
                    sx={open ? styles.drawerStyled : styles.hideDrawer}
                >
                    {/* Toolbar inside Drawer containing close button */}
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    {/* Divider for visual separation */}
                    <Divider />
                    {/* Sidebar navigation list */}
                    <List component="nav">
                        <SideBar />
                    </List>
                </Drawer>
                {/* Main content area */}
                <Box component="main" sx={styles.boxStyled}>
                    {/* Spacer to push content below the AppBar */}
                    <Toolbar />
                    {/* Define routes for different admin pages */}
                    <Routes>
                        {/* Route for the admin home page */}
                        <Route path="/" element={<AdminHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} />
                        {/* Specific routes for various admin functionalities */}
                        <Route path="/Admin/dashboard" element={<AdminHomePage />} />
                        <Route path="/Admin/profile" element={<AdminProfile />} />
                        <Route path="/Admin/complains" element={<SeeComplains />} />

                        {/* Routes for Notice management */}
                        <Route path="/Admin/addnotice" element={<AddNotice />} />
                        <Route path="/Admin/notices" element={<ShowNotices />} />

                        {/* Routes for Subject management */}
                        <Route path="/Admin/subjects" element={<ShowSubjects />} />
                        <Route path="/Admin/subjects/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subjects/chooseclass" element={<ChooseClass situation="Subject" />} />
                        <Route path="/Admin/addsubject/:id" element={<SubjectForm />} />
                        <Route path="/Admin/class/subject/:classID/:subjectID" element={<ViewSubject />} />
                        <Route path="/Admin/subject/student/attendance/:studentID/:subjectID" element={<StudentAttendance situation="Subject" />} />
                        <Route path="/Admin/subject/student/marks/:studentID/:subjectID" element={<StudentExamMarks situation="Subject" />} />

                        {/* Routes for Class management */}
                        <Route path="/Admin/addclass" element={<AddClass />} />
                        <Route path="/Admin/classes" element={<ShowClasses />} />
                        <Route path="/Admin/classes/class/:id" element={<ClassDetails />} />
                        <Route path="/Admin/class/addstudents/:id" element={<AddStudent situation="Class" />} />

                        {/* Routes for Student management */}
                        <Route path="/Admin/addstudents" element={<AddStudent situation="Student" />} />
                        <Route path="/Admin/students" element={<ShowStudents />} />
                        <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                        <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                        <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />

                        {/* Routes for Teacher management */}
                        <Route path="/Admin/teachers" element={<ShowTeachers />} />
                        <Route path="/Admin/teachers/teacher/:id" element={<TeacherDetails />} />
                        <Route path="/Admin/teachers/chooseclass" element={<ChooseClass situation="Teacher" />} />
                        <Route path="/Admin/teachers/choosesubject/:id" element={<ChooseSubject situation="Norm" />} />
                        <Route path="/Admin/teachers/choosesubject/:classID/:teacherID" element={<ChooseSubject situation="Teacher" />} />
                        <Route path="/Admin/teachers/addteacher/:id" element={<AddTeacher />} />

                        {/* Route for Logout functionality */}
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default AdminDashboard;

// Define custom styling for various components
const styles = {
    // Style for the main content area with responsive background color
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    // Style for the toolbar inside the Drawer for alignment and spacing
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    // Style for the Drawer when it is open
    drawerStyled: {
        display: "flex"
    },
    // Style to hide the Drawer on small screens when closed
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}
