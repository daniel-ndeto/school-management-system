import React from 'react';
import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="SpeedDial playground example" // Accessibility label for screen readers.
            icon={<TuneIcon />} // Main icon for the SpeedDial button.
            direction="left" // Direction in which actions will appear.
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name} // Unique key for each action.
                    icon={action.icon} // Icon for the action.
                    tooltipTitle={action.name} // Tooltip text for the action.
                    onClick={action.action} // Click handler for the action.
                />
            ))}
        </CustomSpeedDial>
    );
};

export default SpeedDialTemplate;

const CustomSpeedDial = styled(SpeedDial)(({ theme }) => ({
  '.MuiSpeedDial-fab': {
    backgroundColor: '#032803', // Default background color.
    '&:hover': {
      backgroundColor: 'green', // Background color on hover.
    },
  },
}));