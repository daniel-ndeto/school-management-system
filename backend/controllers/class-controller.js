// Importing required models
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');
const Teacher = require('../models/teacherSchema.js');

// Controller to create a new class
const sclassCreate = async (req, res) => {
    try {
        // Create a new class instance
        const sclass = new Sclass({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        // Check if a class with the same name already exists in the school
        const existingSclassByName = await Sclass.findOne({
            sclassName: req.body.sclassName,
            school: req.body.adminID
        });

        if (existingSclassByName) {
            // If class already exists, send a message
            res.send({ message: 'Sorry this class name already exists' });
        } else {
            // Save the new class and send the result
            const result = await sclass.save();
            res.send(result);
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Controller to list all classes for a specific school
const sclassList = async (req, res) => {
    try {
        // Find all classes for the given school ID
        let sclasses = await Sclass.find({ school: req.params.id });
        if (sclasses.length > 0) {
            // If classes are found, send them
            res.send(sclasses);
        } else {
            // If no classes are found, send a message
            res.send({ message: "No sclasses found" });
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Controller to get details of a specific class
const getSclassDetail = async (req, res) => {
    try {
        // Find the class by its ID
        let sclass = await Sclass.findById(req.params.id);
        if (sclass) {
            // Populate the school field with its name
            sclass = await sclass.populate("school", "schoolName");
            res.send(sclass);
        } else {
            // If class is not found, send a message
            res.send({ message: "No class found" });
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Controller to get all students in a specific class
const getSclassStudents = async (req, res) => {
    try {
        // Find all students in the given class
        let students = await Student.find({ sclassName: req.params.id });
        if (students.length > 0) {
            // Remove the password field from the student objects before sending
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents);
        } else {
            // If no students are found, send a message
            res.send({ message: "No students found" });
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Controller to delete a specific class and its related data
const deleteSclass = async (req, res) => {
    try {
        // Delete the class by its ID
        const deletedClass = await Sclass.findByIdAndDelete(req.params.id);
        if (!deletedClass) {
            // If class is not found, send a message
            return res.send({ message: "Class not found" });
        }
        // Delete all related students, subjects, and teachers
        const deletedStudents = await Student.deleteMany({ sclassName: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ sclassName: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ teachSclass: req.params.id });
        res.send(deletedClass);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Controller to delete all classes and their related data for a specific school
const deleteSclasses = async (req, res) => {
    try {
        // Delete all classes for the given school ID
        const deletedClasses = await Sclass.deleteMany({ school: req.params.id });
        if (deletedClasses.deletedCount === 0) {
            // If no classes are found, send a message
            return res.send({ message: "No classes found to delete" });
        }
        // Delete all related students, subjects, and teachers
        const deletedStudents = await Student.deleteMany({ school: req.params.id });
        const deletedSubjects = await Subject.deleteMany({ school: req.params.id });
        const deletedTeachers = await Teacher.deleteMany({ school: req.params.id });
        res.send(deletedClasses);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Exporting all the controllers
module.exports = { sclassCreate, sclassList, deleteSclass, deleteSclasses, getSclassDetail, getSclassStudents };