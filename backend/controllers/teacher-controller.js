const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');

// Registers a new teacher
const teacherRegister = async (req, res) => {
    const { name, email, password, role, school, teachSubject, teachSclass } = req.body;
    try {
        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        // Create a new teacher object
        const teacher = new Teacher({ name, email, password: hashedPass, role, school, teachSubject, teachSclass });

        // Check if a teacher with the same email already exists
        const existingTeacherByEmail = await Teacher.findOne({ email });

        if (existingTeacherByEmail) {
            // Respond with an error if email already exists
            res.send({ message: 'Email already exists' });
        } else {
            // Save the teacher and update the subject with the teacher's ID
            let result = await teacher.save();
            await Subject.findByIdAndUpdate(teachSubject, { teacher: teacher._id });
            result.password = undefined; // Remove password from the response
            res.send(result);
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Logs in a teacher
const teacherLogIn = async (req, res) => {
    try {
        // Find the teacher by email
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) {
            // Validate the password
            const validated = await bcrypt.compare(req.body.password, teacher.password);
            if (validated) {
                // Populate related fields and remove password from the response
                teacher = await teacher.populate("teachSubject", "subName sessions");
                teacher = await teacher.populate("school", "schoolName");
                teacher = await teacher.populate("teachSclass", "sclassName");
                teacher.password = undefined;
                res.send(teacher);
            } else {
                // Respond with an error if the password is invalid
                res.send({ message: "Invalid password" });
            }
        } else {
            // Respond with an error if the teacher is not found
            res.send({ message: "Teacher not found" });
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Retrieves all teachers for a specific school
const getTeachers = async (req, res) => {
    try {
        // Find teachers by school ID and populate related fields
        let teachers = await Teacher.find({ school: req.params.id })
            .populate("teachSubject", "subName")
            .populate("teachSclass", "sclassName");
        if (teachers.length > 0) {
            // Remove passwords from the response
            let modifiedTeachers = teachers.map((teacher) => {
                return { ...teacher._doc, password: undefined };
            });
            res.send(modifiedTeachers);
        } else {
            // Respond if no teachers are found
            res.send({ message: "No teachers found" });
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Retrieves detailed information about a specific teacher
const getTeacherDetail = async (req, res) => {
    try {
        // Find the teacher by ID and populate related fields
        let teacher = await Teacher.findById(req.params.id)
            .populate("teachSubject", "subName sessions")
            .populate("school", "schoolName")
            .populate("teachSclass", "sclassName");
        if (teacher) {
            // Remove password from the response
            teacher.password = undefined;
            res.send(teacher);
        } else {
            // Respond if no teacher is found
            res.send({ message: "No teacher found" });
        }
    } catch (err) {
        // Handle server errors
        res.status(500).json(err);
    }
};

// Updates the subject a teacher is teaching
const updateTeacherSubject = async (req, res) => {
    const { teacherId, teachSubject } = req.body;
    try {
        // Update the teacher's subject and update the subject with the teacher's ID
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { teachSubject },
            { new: true }
        );
        await Subject.findByIdAndUpdate(teachSubject, { teacher: updatedTeacher._id });
        res.send(updatedTeacher);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Deletes a specific teacher
const deleteTeacher = async (req, res) => {
    try {
        // Delete the teacher by ID and unset the teacher field in the related subject
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        await Subject.updateOne(
            { teacher: deletedTeacher._id, teacher: { $exists: true } },
            { $unset: { teacher: 1 } }
        );
        res.send(deletedTeacher);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Deletes all teachers for a specific school
const deleteTeachers = async (req, res) => {
    try {
        // Delete teachers by school ID
        const deletionResult = await Teacher.deleteMany({ school: req.params.id });
        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            // Respond if no teachers are found to delete
            res.send({ message: "No teachers found to delete" });
            return;
        }

        // Update related subjects to unset the teacher field
        const deletedTeachers = await Teacher.find({ school: req.params.id });
        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );
        res.send(deletionResult);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Deletes teachers by class
const deleteTeachersByClass = async (req, res) => {
    try {
        // Delete teachers by class name
        const deletionResult = await Teacher.deleteMany({ sclassName: req.params.id });
        const deletedCount = deletionResult.deletedCount || 0;

        if (deletedCount === 0) {
            // Respond if no teachers are found to delete
            res.send({ message: "No teachers found to delete" });
            return;
        }

        // Update related subjects to unset the teacher field
        const deletedTeachers = await Teacher.find({ sclassName: req.params.id });
        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );
        res.send(deletionResult);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Records attendance for a teacher
const teacherAttendance = async (req, res) => {
    const { status, date } = req.body;

    try {
        // Find the teacher by ID
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            // Respond if the teacher is not found
            return res.send({ message: 'Teacher not found' });
        }

        // Check if attendance for the given date already exists
        const existingAttendance = teacher.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );

        if (existingAttendance) {
            // Update the status if attendance exists
            existingAttendance.status = status;
        } else {
            // Add a new attendance record
            teacher.attendance.push({ date, status });
        }

        // Save the updated teacher record
        const result = await teacher.save();
        return res.send(result);
    } catch (error) {
        // Handle server errors
        res.status(500).json(error);
    }
};

// Export all controller functions
module.exports = {
    teacherRegister,
    teacherLogIn,
    getTeachers,
    getTeacherDetail,
    updateTeacherSubject,
    deleteTeacher,
    deleteTeachers,
    deleteTeachersByClass,
    teacherAttendance
};