const fs = require('fs/promises');

/**
 * Load all employees
 */
async function getAllEmployees() {
    let rawData = await fs.readFile('employees.json');
    return JSON.parse(rawData);
}

/**
 * Find employee by ID
 */
async function findEmployee(empId) {
    let employees = await getAllEmployees();
    return employees.find(e => e.employeeId === empId);
}

/**
 * Find shift by ID
 */
async function findShift(shiftId) {
    let rawData = await fs.readFile('shifts.json');
    let shifts = JSON.parse(rawData);
    return shifts.find(s => s.shiftId === shiftId);
}

/**
 * Get all assignments
 */
async function getAssignments() {
    let rawData = await fs.readFile('assignments.json');
    return JSON.parse(rawData);
}

/**
 * Save assignments
 */
async function saveAssignments(assignments) {
    await fs.writeFile('assignments.json', JSON.stringify(assignments, null, 4));
}

/**
 * Add assignment
 */
async function addAssignment(empId, shiftId) {
    let assignments = await getAssignments();
    assignments.push({ employeeId: empId, shiftId: shiftId });
    await saveAssignments(assignments);
}

/**
 * Add employee record
 */
async function addEmployeeRecord(emp) {
    let employees = await getAllEmployees();
    let maxId = 0;

    for (let e of employees) {
        let eid = Number(e.employeeId.slice(1));
        if (eid > maxId) maxId = eid;
    }

    emp.employeeId = `E${String(maxId + 1).padStart(3, '0')}`;
    employees.push(emp);

    await fs.writeFile('employees.json', JSON.stringify(employees, null, 4));
}

module.exports = {
    getAllEmployees,
    findEmployee,
    findShift,
    getAssignments,
    addAssignment,
    addEmployeeRecord
};
