// const dbTable = require('console.table');
const inquirer = require('inquirer');
// const mysql = require('mysql2');
const db = require('./connection');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "honeytwix1801",
//     database: "employees_db",
// },
//     console.log("You're connected to the database")
// )
// db.connect(function(err){
//     if (err) throw err
// });

function beginTracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choose',
            message: 'What do you want to do?',
            choices: [
                'View departments',
                'View roles',
                'View employees',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee'
            ],
        }
    ]).then(function(val) {
        // use a switch to cycle through the choices and prompt accordingly with a function
        switch (val.choose) {
            case 'View departments':
                viewDepts();
            break;

            case 'View roles':
                viewRoles();
            break;

            case 'View employees':
                viewEmployees();
            break;

            case 'Add department':
                addDept();
            break;

            case 'Add role':
                addRole();
            break;

            case 'Add employee':
                addEmployee();
            break;

            case 'Update employee':
                updateEmployee();
            break;
        }
    })
}

// view functions

function viewDepts() {
    db.query('SELECT * from department', (err, res) => {
        if (err) throw (err);
        console.table(res);
        beginTracker();
    })
};

function viewRoles() {
    db.query('SELECT * from roles', (err, res) => {
        if (err) throw (err);
        console.table(res);
        beginTracker();
    })
};

function viewEmployees() {
    db.query('SELECT * from employee', (err, res) => {
        if (err) throw (err);
        console.table(res);
        beginTracker();
    })
};

// add functions
function addDept() {
    const deptQuestions = [
        {
            type: 'input',
            name: 'title',
            message: 'What department would you like to add?'
        }
    ]

    inquirer.prompt(deptQuestions).then((answers) => {
        const info = `INSERT INTO department (name) VALUES('${answers.title}')`;
        db.query(info, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
};

function addRole() {
    const roleQuestions = [
        {
            type: 'input',
            name: 'title',
            message: 'What role would tou like to add?'
        },

        {
            type: 'input',
            name: 'salary',
            message: 'What is their salary?'
        },

        {
            type: 'input',
            name: 'deptId',
            message: 'What is the department ID for this role?'
        }
    ]

    inquirer.prompt(roleQuestions).then((answers) => {
        const info = `INSERT INTO roles (title, salary, department_id) VALUES('${answers.title}', '${answers.salary}', '${answers.deptId}')`;
        db.query(info, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
};

function addEmployee() {
    const employeeQuestions = [
        {
            type: 'input',
            name: 'firstname',
            message: 'What is the first name of this employee?'
        },

        {
            type: 'input',
            name: 'lastname',
            message: 'What is the last name of this employee?'
        },

        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employee role ID?'
        },

        {
            type: 'input',
            name: 'managerId',
            message: 'What is the manager ID of this employee, if they are a manager?'
        }
    ]

    inquirer.prompt(employeeQuestions).then((answers) => {
        const info = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.firstname}', '${answers.lastname}', '${answers.roleId}', '${answers.managerId}')`;
        db.query(info, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
};

// update employee
function updateEmployee() {
    const staff = `SELECT * FROM employee`;
    db.query(staff, (err, result) => {
        if (err) {
            console.log(err);
        }

        const staffNames = result.map(
            (employee) => `${employee.first_name} ${employee.last_name}`
        );
        const updateStaff = [
            {
                type: 'list',
                name: 'employee',
                message: 'What profile would you like to edit?',
                choices: staffNames,
            }
        ]

        inquirer.prompt(updateStaff).then((empAnsw) => {
            const info = `SELECT * FROM roles`;
            db.query(info, (err, result) => {
                if (err) {
                    console.log(err);
                }
                const roleId = result.map(
                    (roles) => `${roles.id}`
                );

                const updateRoleQuestions = [
                    {
                        type: 'list',
                        name: 'roles',
                        message: 'Which role do you want to update to?',
                        choices: roleId
                    }
                ]
                inquirer.prompt(updateRoleQuestions).then((roleAnsw) =>{
                // const info = `INSERT INTO employee(role_id) VALUES(${answers.roles})`
                const info = `Update employee Set role_id = ${roleAnsw} where employee_name = ${empAnsw})`

                db.query(info, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })});
            });
        });
        
    })   
};
beginTracker();

// myFunc()
//     .then(()=>{

//     })
//     .then(()=>{

//     })