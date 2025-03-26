import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
// importing ActionMenu component
import ActionMenu from './ActionMenu';

const MyResponsiveComponent = ({ row, actions }) => {
  // State to track if the device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if the screen width matches a mobile device
    const handleResize = () => {
      const isMobileDevice = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobileDevice); // Update state based on screen size
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the value on the first render

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        // Render ActionMenu if the device is mobile
        <ActionMenu row={row} actions={actions} />
      ) : (
        // Render StyledSpeedDial if the device is not mobile
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          icon={<SpeedDialIcon />}
          direction="right"
        >
          {/* Map through actions and render SpeedDialAction for each */}
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name} 
              icon={action.icon} 
              tooltipTitle={action.name} 
              onClick={action.action} 
            />
          ))}
        </StyledSpeedDial>
      )}
    </>
  );
};

// Styled component for customizing SpeedDial
const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439; // Default background color
    &:hover {
      background-color: #440080; // Background color on hover
    }
  }
`;

export default MyResponsiveComponent;
