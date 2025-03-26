// Function to calculate the attendance percentage for a specific subject
export const calculateSubjectAttendancePercentage = (presentCount, totalSessions) => {
    if (totalSessions === 0 || presentCount === 0) return 0; // Handle edge cases
    return ((presentCount / totalSessions) * 100).toFixed(2); // Calculate and return percentage
};

// Function to group attendance data by subject
export const groupAttendanceBySubject = (subjectAttendance) => {
    const attendanceBySubject = {}; // Stores attendance grouped by subject

    subjectAttendance.forEach((attendance) => {
        const subName = attendance.subName.subName; // Subject name
        const sessions = attendance.subName.sessions; // Total sessions
        const subId = attendance.subName._id; // Unique subject ID

        // Initialize subject data if not already present
        if (!attendanceBySubject[subName]) {
            attendanceBySubject[subName] = {
                present: 0,
                absent: 0,
                sessions: sessions,
                allData: [],
                subId: subId
            };
        }

        // Update present/absent counts
        if (attendance.status === "Present") {
            attendanceBySubject[subName].present++;
        } else if (attendance.status === "Absent") {
            attendanceBySubject[subName].absent++;
        }

        // Add detailed attendance record
        attendanceBySubject[subName].allData.push({
            date: attendance.date,
            status: attendance.status,
        });
    });

    return attendanceBySubject; // Return grouped data
};

// Function to calculate the overall attendance percentage across all subjects
export const calculateOverallAttendancePercentage = (subjectAttendance) => {
    let totalSessionsSum = 0; // Total sessions across all subjects
    let presentCountSum = 0; // Total present sessions
    const uniqueSubIds = []; // Tracks processed subject IDs

    subjectAttendance.forEach((attendance) => {
        const subId = attendance.subName._id;

        // Add sessions for unique subjects only
        if (!uniqueSubIds.includes(subId)) {
            totalSessionsSum += parseInt(attendance.subName.sessions);
            uniqueSubIds.push(subId);
        }

        // Count present sessions
        if (attendance.status === "Present") presentCountSum++;
    });

    if (totalSessionsSum === 0 || presentCountSum === 0) return 0; // Handle edge cases
    return (presentCountSum / totalSessionsSum) * 100; // Calculate and return percentage
};