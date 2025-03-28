import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

// Component to add a new notice
const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get status and user info from Redux store
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  // Local state for form fields
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  // Get admin ID from current user
  const adminID = currentUser._id;

  // Local state for loader and popup messages
  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  // Prepare fields to be sent with the action
  const fields = { title, details, date, adminID };
  const address = "Notice";

  // Handle form submission to add a new notice
  const submitHandler = (event) => {
    event.preventDefault(); // Prevent default form behavior
    setLoader(true); // Show loader during submission
    dispatch(addStuff(fields, address)); // Dispatch add notice action
  };

  // Monitor the status and handle navigation or errors
  useEffect(() => {
    if (status === 'added') {
      // On success, navigate back to notices list and reset state
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      // On error, show popup with message and stop loader
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      {/* Form for adding notice */}
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <span className="registerTitle">Add Notice</span>
          <label>Title</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <label>Details</label>
          <input
            className="registerInput"
            type="text"
            placeholder="Enter notice details..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
          />

          <label>Date</label>
          <input
            className="registerInput"
            type="date"
            placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />

          {/* Submit button shows a spinner if loader is active */}
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add'
            )}
          </button>
        </form>
      </div>
      {/* Popup for error messages */}
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;
