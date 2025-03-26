const bcrypt = require('bcrypt');
const Student = require('../models/studentSchema.js');
const Subject = require('../models/subjectSchema.js');

// Registers a new student
const studentRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
        const hashedPass = await bcrypt.hash(req.body.password, salt); // Hash the password

        // Check if a student with the same roll number already exists
        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            school: req.body.adminID,
            sclassName: req.body.sclassName,
        });

        if (existingStudent) {
            res.send({ message: 'Roll Number already exists' }); // Return error if student exists
        } else {
            // Create a new student
            const student = new Student({
                ...req.body,
                school: req.body.adminID,
                password: hashedPass
            });

            let result = await student.save(); // Save the student to the database
            result.password = undefined; // Remove password from the response
            res.send(result); // Send the saved student data
        }
    } catch (err) {
        res.status(500).json(err); // Handle server errors
    }
};

// Logs in a student
const studentLogIn = async (req, res) => {
    try {
        // Find the student by roll number and name
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.studentName });
        if (student) {
            // Validate the password
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                // Populate related fields and remove sensitive data
                student = await student.populate("school", "schoolName");
                student = await student.populate("sclassName", "sclassName");
                student.password = undefined;
                student.examResult = undefined;
                student.attendance = undefined;
                res.send(student); // Send the student data
            } else {
                res.send({ message: "Invalid password" }); // Invalid password
            }
        } else {
            res.send({ message: "Student not found" }); // Student not found
        }
    } catch (err) {
        res.status(500).json(err); // Handle server errors
    }
};

// Retrieves all students for a specific school
const getStudents = async (req, res) => {
    try {
        // Find students by school ID and populate class name
        let students = await Student.find({ school: req.params.id }).populate("sclassName", "sclassName");
        if (students.length > 0) {
            // Remove sensitive data from each student
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            res.send(modifiedStudents); // Send the list of students
        } else {
            res.send({ message: "No students found" }); // No students found
        }
    } catch (err) {
        res.status(500).json(err); // Handle server errors
    }
};

// Retrieves details of a specific student
const getStudentDetail = async (req, res) => {
    try {
        // Find student by ID and populate related fields
        let student = await Student.findById(req.params.id)
            .populate("school", "schoolName")
            .populate("sclassName", "sclassName")
            .populate("examResult.subName", "subName")
            .populate("attendance.subName", "subName sessions");
        if (student) {
            student.password = undefined; // Remove sensitive data
            res.send(student); // Send student details
        } else {
            res.send({ message: "No student found" }); // Student not found
        }
    } catch (err) {
        res.status(500).json(err); // Handle server errors
    }
};

// Deletes a specific student by ID
const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id); // Delete student
        res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Deletes all students for a specific school
const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({ school: req.params.id }); // Delete students
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" }); // No students found
        } else {
            res.send(result); // Send the result
        }
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Deletes all students in a specific class
const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id }); // Delete students
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" }); // No students found
        } else {
            res.send(result); // Send the result
        }
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Updates a student's details
const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt for password hashing
            req.body.password = await bcrypt.hash(req.body.password, salt); // Hash the password
        }
        let result = await Student.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Update student details
            { new: true } // Return the updated document
        );

        result.password = undefined; // Remove sensitive data
        res.send(result); // Send the updated student
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Updates a student's exam result
const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;

    try {
        const student = await Student.findById(req.params.id); // Find student by ID

        if (!student) {
            return res.send({ message: 'Student not found' }); // Student not found
        }

        // Check if the result for the subject already exists
        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );

        if (existingResult) {
            existingResult.marksObtained = marksObtained; // Update marks
        } else {
            student.examResult.push({ subName, marksObtained }); // Add new result
        }

        const result = await student.save(); // Save the updated student
        return res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Records a student's attendance for a subject
const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;

    try {
        const student = await Student.findById(req.params.id); // Find student by ID

        if (!student) {
            return res.send({ message: 'Student not found' }); // Student not found
        }

        const subject = await Subject.findById(subName); // Find the subject

        // Check if attendance for the subject on the given date already exists
        const existingAttendance = student.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString() &&
                a.subName.toString() === subName
        );

        if (existingAttendance) {
            existingAttendance.status = status; // Update attendance status
        } else {
            // Check if the student has reached the maximum number of sessions
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;

            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' }); // Limit reached
            }

            student.attendance.push({ date, status, subName }); // Add new attendance
        }

        const result = await student.save(); // Save the updated student
        return res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Clears attendance for all students for a specific subject
const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const subName = req.params.id;

    try {
        const result = await Student.updateMany(
            { 'attendance.subName': subName }, // Match students with attendance for the subject
            { $pull: { attendance: { subName } } } // Remove attendance for the subject
        );
        return res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Clears all attendance for all students in a school
const clearAllStudentsAttendance = async (req, res) => {
    const schoolId = req.params.id;

    try {
        const result = await Student.updateMany(
            { school: schoolId }, // Match students in the school
            { $set: { attendance: [] } } // Clear attendance
        );

        return res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Removes attendance for a specific subject for a specific student
const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    const subName = req.body.subId;

    try {
        const result = await Student.updateOne(
            { _id: studentId }, // Match the student
            { $pull: { attendance: { subName: subName } } } // Remove attendance for the subject
        );

        return res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Clears all attendance for a specific student
const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;

    try {
        const result = await Student.updateOne(
            { _id: studentId }, // Match the student
            { $set: { attendance: [] } } // Clear attendance
        );

        return res.send(result); // Send the result
    } catch (error) {
        res.status(500).json(error); // Handle server errors
    }
};

// Export all controller functions
module.exports = {
    studentRegister,
    studentLogIn,
    getStudents,
    getStudentDetail,
    deleteStudents,
    deleteStudent,
    updateStudent,
    studentAttendance,
    deleteStudentsByClass,
    updateExamResult,
    clearAllStudentsAttendanceBySubject,
    clearAllStudentsAttendance,
    removeStudentAttendanceBySubject,
    removeStudentAttendance,
};