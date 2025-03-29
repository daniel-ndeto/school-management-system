// Import necessary dependencies from React, React Router, Redux, and styled-components
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    // Get current user data from Redux store
    const currentUser = useSelector(state => state.user.currentUser);

    // Hooks for navigation and Redux dispatch
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle logout: dispatch logout action and redirect to home
    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    // Handle cancel: return to previous page
    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <h1>{currentUser.name}</h1>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
            <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </LogoutContainer>
    );
};

export default Logout;

// Styled Components
// Container for the logout confirmation dialog
const LogoutContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  background-color: #85769f66;
  color: black;
`;

// Styled message text
const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

// Base button styles
const LogoutButton = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #333;
  }
`;

// Logout button with red background
const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ea0606;
`;

// Cancel button with purple background
const LogoutButtonCancel = styled(LogoutButton)`
  background-color: rgb(99, 60, 99);
`;
