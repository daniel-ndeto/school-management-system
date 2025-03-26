// Importing necessary libraries and components
import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Functional component for the account menu
const AccountMenu = () => {
    // State to manage the anchor element for the menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Boolean to check if the menu is open
    const open = Boolean(anchorEl);

    // Extracting user information from the Redux store
    const { currentRole, currentUser } = useSelector(state => state.user);

    // Function to handle menu opening
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle menu closing
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {/* Box to wrap the account menu icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                {/* Tooltip for the account settings icon */}
                <Tooltip title="Account settings">
                    {/* IconButton to trigger the menu */}
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {/* Avatar displaying the first letter of the user's name */}
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {String(currentUser.name).charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>

            {/* Menu component for account options */}
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: styles.styledPaper, // Custom styles for the menu
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* Menu item for the profile link */}
                <MenuItem>
                    <Avatar />
                    <Link to={`/${currentRole}/profile`}>
                        Profile
                    </Link>
                </MenuItem>
                <Divider /> {/* Divider between menu items */}
                {/* Menu item for settings */}
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                {/* Menu item for logout */}
                <MenuItem>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Link to="/logout">
                        Logout
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
}

export default AccountMenu;

// Custom styles for the menu's Paper component
const styles = {
    styledPaper: {
        overflow: 'visible', // Ensures the menu content is visible
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))', // Adds a shadow effect
        mt: 1.5, // Adds margin at the top
        '& .MuiAvatar-root': {
            width: 32, // Avatar width
            height: 32, // Avatar height
            ml: -0.5, // Left margin
            mr: 1, // Right margin
        },
        '&:before': {
            content: '""', // Adds a pseudo-element for the arrow
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper', // Matches the menu background
            transform: 'translateY(-50%) rotate(45deg)', // Rotates the arrow
            zIndex: 0, // Ensures it appears below the menu
        },
    }
}