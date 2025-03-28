// Import React hooks and MUI components
import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

// Main component for displaying and managing classes
const ShowClasses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get classes and user data from Redux store
  const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
  const { currentUser } = useSelector(state => state.user);
  const adminID = currentUser._id; // Admin identifier for fetching classes

  // Fetch all classes for the admin when component mounts or adminID changes
  useEffect(() => {
    dispatch(getAllSclasses(adminID, "Sclass"));
  }, [adminID, dispatch]);

  // Log any error that might occur during fetching
  if (error) {
    console.log(error);
  }

  // Popup state for showing alerts or messages
  const [showPopup, setShowPopup] = useState(false);
  const [message] = useState(''); // Static message in this case

  // Function to handle deletion of a class
  const deleteHandler = (deleteID, address) => {
    // Dispatch deletion action and then refetch the classes list
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
      });
  };

  // Define table columns for displaying class names
  const sclassColumns = [
    { id: 'name', label: 'Class Name', minWidth: 170 },
  ];

  // Map classes from the store to table rows
  const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
    return {
      name: sclass.sclassName,
      id: sclass._id,
    };
  });

  // Component to render action buttons for each class row in the table
  const SclassButtonHaver = ({ row }) => {
    // Define additional actions for subjects and students
    const actions = [
      {
        icon: <PostAddIcon />,
        name: 'Add Subjects',
        action: () => navigate("/Admin/addsubject/" + row.id)
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: 'Add Student',
        action: () => navigate("/Admin/class/addstudents/" + row.id)
      },
    ];
    return (
      <ButtonContainer>
        {/* Delete button for class */}
        <IconButton onClick={() => deleteHandler(row.id, "Sclass")} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        {/* View button navigates to class details */}
        <BlueButton variant="contained"
          onClick={() => navigate("/Admin/classes/class/" + row.id)}>
          View
        </BlueButton>
        {/* Menu for additional actions */}
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  // Component to display an action menu with extra options
  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Open the menu by setting the anchor element
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    // Close the menu by resetting the anchor element
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              {/* Label for the menu */}
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>
        {/* Menu that pops up when the action button is clicked */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action} key={action.name}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  };

  // Global actions available for the entire classes list
  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: 'Add New Class',
      action: () => navigate("/Admin/addclass")
    },
    {
      icon: <DeleteIcon color="error" />,
      name: 'Delete All Classes',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {/* Show a loading indicator while data is being fetched */}
      {loading ?
        <div>Loading...</div>
        :
        <>
          {/* If getresponse flag is true, show a simple Add Class button */}
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addclass")}>
                Add Class
              </GreenButton>
            </Box>
            :
            <>
              {/* If there are classes available, display them in a table */}
              {Array.isArray(sclassesList) && sclassesList.length > 0 &&
                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
              }
              {/* Speed dial for quick actions */}
              <SpeedDialTemplate actions={actions} />
            </>}
        </>
      }
      {/* Popup component to display messages */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default ShowClasses;

// Styles for the menu popup paper
const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
};

// Styled container for grouping buttons in the table rows
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
