const persistence = require('./persistence');

/**
 * computeShiftDuration
 * Generated using ChatGPT (LLM)
 * Prompt used:
 * "Write a JavaScript function computeShiftDuration(startTime, endTime)
 * that takes times in HH:MM format and returns hours as a decimal number."
 *
 * @param {string} startTime
 * @param {string} endTime
 * @returns {number}
 */
function computeShiftDuration(startTime, endTime) {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotal = startHour * 60 + startMinute;
    const endTotal = endHour * 60 + endMinute;

    return (endTotal - startTotal) / 60;
}

/**
 * Get all employees
 */
async function getAllEmployees() {
    return await persistence.getAllEmployees();
}

/**
 * Add new employee
 */
async function addEmployee(name, phone) {
    await persistence.addEmployeeRecord({
        name: name,
        phone: phone
    });
}

/**
 * Assign shift to employee with validation
 */
async function assignShift(empId, shiftId) {
    let employee = await persistence.findEmployee(empId);
    if (!employee) {
        return "Employee does not exist";
    }

    let shift = await persistence.findShift(shiftId);
    if (!shift) {
        return "Shift does not exist";
    }

    let assignments = await persistence.getAssignments();
    let existing = assignments.find(a => a.employeeId === empId && a.shiftId === shiftId);

    if (existing) {
        return "Employee already assigned to shift";
    }

    await persistence.addAssignment(empId, shiftId);
    return "Ok";
}

/**
 * Get schedule details for employee
 */
async function getEmployeeSchedule(empId) {
    let assignments = await persistence.getAssignments();
    let shifts = [];

    for (let a of assignments) {
        if (a.employeeId === empId) {
            let shift = await persistence.findShift(a.shiftId);
            if (shift) {
                shifts.push(shift);
            }
        }
    }

    return shifts;
}

module.exports = {
    getAllEmployees,
    addEmployee,
    assignShift,
    getEmployeeSchedule
};
