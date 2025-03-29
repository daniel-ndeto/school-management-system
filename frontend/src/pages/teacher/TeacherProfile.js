// Import necessary dependencies for React component and styling
import React from 'react'
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  // Extract user data from Redux store
  const { currentUser, response, error } = useSelector((state) => state.user);

  // Log any responses or errors for debugging
  if (response) { console.log(response) }
  else if (error) { console.log(error) }

  // Extract nested objects from currentUser for easier access
  const teachSclass = currentUser.teachSclass
  const teachSubject = currentUser.teachSubject
  const teachSchool = currentUser.school

  return (
    <>
      {/* Profile card container */}
      <ProfileCard>
        <ProfileCardContent>
          {/* Display teacher information with consistent formatting */}
          <ProfileText>Name: {currentUser.name}</ProfileText>
          <ProfileText>Email: {currentUser.email}</ProfileText>
          <ProfileText>Class: {teachSclass.sclassName}</ProfileText>
          <ProfileText>Subject: {teachSubject.subName}</ProfileText>
          <ProfileText>School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </>
  )
}

export default TeacherProfile

// Styled components for profile card styling
const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
`;

// Container for profile content with centered alignment
const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Consistent text styling for profile information
const ProfileText = styled(Typography)`
  margin: 10px;
`;
