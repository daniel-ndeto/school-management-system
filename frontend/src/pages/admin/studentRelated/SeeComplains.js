import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Checkbox } from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';

const SeeComplains = () => {
  // Label for the Checkbox component
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };  
  const dispatch = useDispatch();

  const { complainsList, loading, error } = useSelector((state) => state.complain);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch complaints when currentUser is available
    if (currentUser?._id) {
      dispatch(getAllComplains(currentUser._id, "Complain"));
    }
  }, [currentUser?._id, dispatch]);

  if (error) {
    console.error("Error fetching complains:", error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = Array.isArray(complainsList)
    ? complainsList.map((complain) => {
        const date = new Date(complain?.date);
        const dateString = !isNaN(date.getTime())
          ? date.toISOString().substring(0, 10)
          : "Invalid Date";

        return {
          user: complain?.user?.name || "Unknown",
          complaint: complain?.complaint || "No details",
          date: dateString,
          id: complain?._id || "N/A",
        };
      })
    : [];

  // Component for rendering a Checkbox in each table row
  const ComplainButtonHaver = ({ row }) => {
    return <Checkbox {...label} />;
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {complainRows.length > 0 ? (
            <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              No Complaints Available
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default SeeComplains;
