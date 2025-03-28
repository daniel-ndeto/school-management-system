import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Paper, Box, IconButton } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllNotices } from '../../../redux/noticeRelated/noticeHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import TableTemplate from '../../../components/TableTemplate';
import { GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

// Component to display all notices and manage them
const ShowNotices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get notices and user data from the Redux store
  const { noticesList, loading, error, response } = useSelector((state) => state.notice);
  const { currentUser } = useSelector(state => state.user);

  // Fetch all notices for the current user when component mounts
  useEffect(() => {
    dispatch(getAllNotices(currentUser._id, "Notice"));
  }, [currentUser._id, dispatch]);

  // Log any errors encountered during fetching
  if (error) {
    console.log(error);
  }

  // Handler to delete a notice; after deletion, refetch the notices list
  const deleteHandler = (deleteID, address) => {
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllNotices(currentUser._id, "Notice"));
      });
  };

  // Define columns for the notices table
  const noticeColumns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'details', label: 'Details', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  // Map the notices data to table rows and format the date properly
  const noticeRows = noticesList && noticesList.length > 0 && noticesList.map((notice) => {
    const date = new Date(notice.date);
    // Check for a valid date and convert it to a string format (YYYY-MM-DD)
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      title: notice.title,
      details: notice.details,
      date: dateString,
      id: notice._id,
    };
  });

  // Component to render action buttons for each notice row
  const NoticeButtonHaver = ({ row }) => {
    return (
      <>
        {/* Button to delete a notice */}
        <IconButton onClick={() => deleteHandler(row.id, "Notice")}>
          <DeleteIcon color="error" />
        </IconButton>
      </>
    );
  };

  // Define global actions for the notices page
  const actions = [
    {
      icon: <NoteAddIcon color="primary" />, 
      name: 'Add New Notice',
      action: () => navigate("/Admin/addnotice")
    },
    {
      icon: <DeleteIcon color="error" />, 
      name: 'Delete All Notices',
      action: () => deleteHandler(currentUser._id, "Notices")
    }
  ];

  return (
    <>
      {loading ? (
        // Show a loading message or spinner while data is being fetched
        <div>Loading...</div>
      ) : (
        <>
          {response ? (
            // If response flag is true, show an Add Notice button at the top
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addnotice")}>
                Add Notice
              </GreenButton>
            </Box>
          ) : (
            // Otherwise, display the notices table inside a Paper component
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {Array.isArray(noticesList) && noticesList.length > 0 && (
                <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
              )}
              {/* Speed dial for quick access to global actions */}
              <SpeedDialTemplate actions={actions} />
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default ShowNotices;
