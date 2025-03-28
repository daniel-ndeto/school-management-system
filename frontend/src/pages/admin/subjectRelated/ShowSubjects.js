import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate(); // Hook for navigation
    const dispatch = useDispatch(); // Hook to dispatch Redux actions
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass); // Get subjects-related state
    const { currentUser } = useSelector(state => state.user); // Get current user from state

    // Fetch all subjects for the current user on component mount
    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    // Log error if it exists
    if (error) {
        console.log(error);
    }

    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
    const [message, setMessage] = useState(""); // State to hold popup message

    // Handler to delete a subject or all subjects
    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                // Refresh the subject list after deletion
                dispatch(getSubjectList(currentUser._id, "AllSubjects"));
            })
    }

    // Define table columns for subjects
    const subjectColumns = [
        { id: 'subName', label: 'Sub Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    // Map subjects list to table rows
    const subjectRows = subjectsList.map((subject) => {
        return {
            subName: subject.subName,
            sessions: subject.sessions,
            sclassName: subject.sclassName.sclassName,
            sclassID: subject.sclassName._id,
            id: subject._id,
        };
    });

    // Component for rendering action buttons in each table row
    const SubjectsButtonHaver = ({ row }) => {
        return (
            <>
                {/* Button to delete a subject */}
                <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                    <DeleteIcon color="error" />
                </IconButton>
                {/* Button to view subject details */}
                <BlueButton variant="contained"
                    onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
                    View
                </BlueButton>
            </>
        );
    };

    // Define actions for the Speed Dial component
    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects")
        }
    ];

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        // If there's a response, show Add Subjects button at the top-right
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}>
                                Add Subjects
                            </GreenButton>
                        </Box>
                        :
                        // Otherwise, display the subjects table and Speed Dial actions
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 &&
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
            {/* Popup component for displaying messages */}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;
