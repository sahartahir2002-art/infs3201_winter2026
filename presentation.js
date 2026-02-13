const prompt = require('prompt-sync')();
const business = require('./business');

/**
 * Display employees in formatted table
 */
async function displayEmployees() {
    let employees = await business.getAllEmployees();

    console.log('Employee ID  Name                Phone');
    console.log('-----------  ------------------- ---------');

    for (let emp of employees) {
        console.log(`${emp.employeeId.padEnd(13)}${emp.name.padEnd(20)}${emp.phone}`);
    }
}

/**
 * UI for adding employee
 */
async function addNewEmployee() {
    let name = prompt('Enter employee name: ');
    let phone = prompt('Enter phone number: ');
    await business.addEmployee(name, phone);
    console.log('Employee added...');
}

/**
 * UI for scheduling employee
 */
async function scheduleEmployee() {
    let empId = prompt('Enter employee ID: ');
    let shiftId = prompt('Enter shift ID: ');

    let result = await business.assignShift(empId, shiftId);

    if (result === 'Ok') {
        console.log("Shift Recorded");
    } else {
        console.log(result);
    }
}

/**
 * UI for viewing employee schedule
 */
async function viewEmployeeSchedule() {
    let empId = prompt('Enter employee ID: ');
    let schedule = await business.getEmployeeSchedule(empId);

    console.log('\ndate,start,end');

    for (let s of schedule) {
        console.log(`${s.date},${s.startTime},${s.endTime}`);
    }
}

/**
 * Main menu
 */
async function displayMenu() {
    while (true) {
        console.log('1. Show all employees');
        console.log('2. Add new employee');
        console.log('3. Assign employee to shift');
        console.log('4. View employee schedule');
        console.log('5. Exit');

        let choice = Number(prompt("What is your choice> "));

        if (choice === 1) {
            await displayEmployees();
        } else if (choice === 2) {
            await addNewEmployee();
        } else if (choice === 3) {
            await scheduleEmployee();
        } else if (choice === 4) {
            await viewEmployeeSchedule();
        } else if (choice === 5) {
            break;
        } else {
            console.log("Invalid selection");
        }

        console.log('\n');
    }

    console.log('*** Goodbye!');
}

displayMenu();
