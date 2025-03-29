// Import necessary React and Material UI components
import { useState } from 'react';
import {
    CssBaseline,
    Box,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import StudentSideBar from './StudentSideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
// Import student dashboard components
import StudentHomePage from './StudentHomePage';
import StudentProfile from './StudentProfile';
import StudentSubjects from './StudentSubjects';
import ViewStdAttendance from './ViewStdAttendance';
import StudentComplain from './StudentComplain';
import Logout from '../Logout'
import AccountMenu from '../../components/AccountMenu';
// Import custom styled components
import { AppBar, Drawer } from '../../components/styles';

const StudentDashboard = () => {
    // State to control sidebar open/close
    const [open, setOpen] = useState(true);
    // Toggle drawer visibility
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                {/* Reset CSS baseline */}
                <CssBaseline />
                {/* App bar that adjusts with drawer state */}
                <AppBar open={open} position='absolute'>
                    <Toolbar sx={{ pr: '24px' }}>
                        {/* Menu icon to open drawer when closed */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }), // Hide when drawer is open
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* Dashboard title */}
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Student Dashboard
                        </Typography>
                        {/* User account menu */}
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                {/* Sidebar drawer with conditional styling */}
                <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        {/* Close drawer button */}
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    {/* Navigation sidebar */}
                    <List component="nav">
                        <StudentSideBar />
                    </List>
                </Drawer>
                {/* Main content area */}
                <Box component="main" sx={styles.boxStyled}>
                    <Toolbar /> {/* Spacer to push content below app bar */}
                    {/* Route configuration */}
                    <Routes>
                        <Route path="/" element={<StudentHomePage />} />
                        <Route path='*' element={<Navigate to="/" />} /> {/* Catch-all redirect */}
                        <Route path="/Student/dashboard" element={<StudentHomePage />} />
                        <Route path="/Student/profile" element={<StudentProfile />} />

                        <Route path="/Student/subjects" element={<StudentSubjects />} />
                        <Route path="/Student/attendance" element={<ViewStdAttendance />} />
                        <Route path="/Student/complain" element={<StudentComplain />} />

                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default StudentDashboard

// Styles object for component styling
const styles = {
    boxStyled: {
        // Responsive background color based on theme
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto', // Enable scrolling for content
    },

    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', // Position close icon at end
        px: [1],
    },

    drawerStyled: {
        display: "flex"
    },
    
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none', // Hide drawer on small screens
        },
    },
}
