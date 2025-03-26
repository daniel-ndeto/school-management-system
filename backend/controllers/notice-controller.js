const Notice = require('../models/noticeSchema.js'); // Import the Notice model

// Create a new notice
const noticeCreate = async (req, res) => {
    try {
        const notice = new Notice({
            ...req.body, // Spread request body to populate notice fields
            school: req.body.adminID // Associate notice with the admin's school
        });
        const result = await notice.save(); // Save the notice to the database
        res.send(result); // Send the saved notice as a response
    } catch (err) {
        res.status(500).json(err); // Handle errors with a 500 status
    }
};

// Get a list of notices for a specific school
const noticeList = async (req, res) => {
    try {
        let notices = await Notice.find({ school: req.params.id }); // Find notices by school ID
        if (notices.length > 0) {
            res.send(notices); // Send the list of notices
        } else {
            res.send({ message: "No notices found" }); // Send a message if no notices exist
        }
    } catch (err) {
        res.status(500).json(err); // Handle errors with a 500 status
    }
};

// Update a specific notice by ID
const updateNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndUpdate(
            req.params.id, // Notice ID from request parameters
            { $set: req.body }, // Update fields from request body
            { new: true } // Return the updated document
        );
        res.send(result); // Send the updated notice as a response
    } catch (error) {
        res.status(500).json(error); // Handle errors with a 500 status
    }
};

// Delete a specific notice by ID
const deleteNotice = async (req, res) => {
    try {
        const result = await Notice.findByIdAndDelete(req.params.id); // Delete notice by ID
        res.send(result); // Send the deleted notice as a response
    } catch (error) {
        res.status(500).json(err); // Handle errors with a 500 status
    }
};

// Delete all notices for a specific school
const deleteNotices = async (req, res) => {
    try {
        const result = await Notice.deleteMany({ school: req.params.id }); // Delete notices by school ID
        if (result.deletedCount === 0) {
            res.send({ message: "No notices found to delete" }); // Send a message if no notices were deleted
        } else {
            res.send(result); // Send the result of the deletion
        }
    } catch (error) {
        res.status(500).json(err); // Handle errors with a 500 status
    }
};

// Export all controller functions
module.exports = { noticeCreate, noticeList, updateNotice, deleteNotice, deleteNotices };