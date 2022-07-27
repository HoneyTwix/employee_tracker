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

function startTracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What do you want to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
                'add a department',
                'add a role',
                'add an employee',
                'update an employee'
            ],
        }
    ]).then(function(response) {
        // use a switch to prompt a choice
        switch (response.choices) {
            case 'view all departments':
                view_all_departments();
            break;

            case 'view all roles':
                view_all_roles();
            break;

            case 'view all employees':
                view_all_employees();
            break;

            case 'add a department':
                add_department();
            break;

            case 'add a role':
                add_role();
            break;

            case 'add an employee':
                add_employee();
            break;

            case 'update an employee':
                update_employee();
            break;
        }
    })
}

function view_all_roles(){
    db.query('SELECT * from roles',(err,res)=>{
        console.table(res)
        startTracker()
    })
}

function view_all_departments(){
    db.query('SELECT * FROM department',(err,res)=>{
        console.table(res)
        startTracker()
    })
}

function view_all_employees(){
    db.query('SELECT * FROM department',(err,res)=>{
        console.table(res)
        startTracker()
    })
}

function add_role(){
    const askRoles = [
        {
            type: 'input',
            name: 'job',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'How much does this role get paid?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What is the ID of the department that this role is in?'
        },
    ]

    inquirer.prompt(askRoles).then((response)=>{
        const insert =`INSERT INTO roles (title, salary, department_id) VALUES('${response.job}', '${response.salary}', '${response.department}')`
        db.query(insert,(err,res)=>{
            console.table(res)
            startTracker()
        })
    })
}

function add_department(){
    deptAsk = [
        {
        type: 'input',
        name: 'deptName',
        message: 'What is the name of the new department addition'},
    ]


inquirer.prompt(deptAsk).then((response)=>{
    const insert = `INSERT INTO department (name) VALUES('${response.deptName}')`;
    db.query(insert,(err,res)=>{
        console.table(res)
        startTracker()
    })
})
}

function add_employee() {
    employAsk =
    [
        {
            type: 'input',
            name: 'firstName',
            message: 'First name of the employee you want to add?'
        },
        {type: 'input',
        name: 'lastName',
        message: 'Last name of the employee you want to add?'},
        {type: 'input',
        name: 'roleID',
        message: 'The role ID of this new employee'},
        {
            type: 'input',
            name: 'managerID',
            message: 'The manager ID of this new employee'
        }
    ]
    inquirer.prompt(employAsk).then((response)=>{
        const insert = `INSERT INTO employee (first_name, last_name, roles_id, manager_id) VALUES('${response.firstName}', '${response.lastName}', '${response.roleID}', '${response.managerID}')`;
        db.query(insert,(err,res)=>{
            console.table(res)
            startTracker()
        })


    })
   
}

function update_employee(){
    console.log('hi')
    db.query('SELECT * FROM employee',(err,res)=>{
        if(err){console.log(err);}
        const staff = res.map((employee)=>`${employee.first_name} ${employee.last_name}`)
const updateEmploy = [
    {
        type: 'list',
        name: 'employee',
        message: 'Which employee do you want to update',
        choice: staff,
    }
]
inquirer.prompt(updateEmploy).then((response)=>{
    db.query('SELECT * FROM roles',(err,res)=>{
        const role = res.map((roles)=>`${roles.title}`)

        const updateRole = [
            {
                type: 'list',
                        name: 'roles',
                        message: 'Which role do you want to update to?',
                        choices: role
            }
        ]
        inquirer.prompt(updateRole).then((response))
    })
})
    })
}

startTracker()