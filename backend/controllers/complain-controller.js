// Import the Complain model
const Complain = require('../models/complainSchema.js');

// Create a new complain
const complainCreate = async (req, res) => {
    try {
        const complain = new Complain(req.body); // Create and save the complain
        const result = await complain.save();
        res.send(result); // Respond with the saved complain
    } catch (err) {
        res.status(500).json(err); // Handle errors
    }
};

// List complains for a specific school
const complainList = async (req, res) => {
    try {
        const complains = await Complain.find({ school: req.params.id }).populate("user", "name");
        if (complains.length > 0) {
            res.send(complains); // Respond with the list of complains
        } else {
            res.send({ message: "No complains found" }); // Respond if no complains
        }
    } catch (err) {
        res.status(500).json(err); 
    }
};

// Export the controller functions
module.exports = { complainCreate, complainList };
