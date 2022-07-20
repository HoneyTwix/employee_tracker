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
        // use a switch to prompt a choice
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

startTracker()