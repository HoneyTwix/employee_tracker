const dbTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./connection');

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "rost",
//     password: "honeytwix1801",
//     database: "employees_db",
// },
//     console.log("You're connected to the database")
// )

const tasks = [
    {
        type: 'list',
        name: 'choice',
        message: 'Which of the following actions do you want to perform',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employer',
        ],
    },
]
console.log('hi')
// debugger;
// const init = () => {
//      inquirer.prompt(tasks).then((answers)=>{
//         if (answers.choice === 'view all employees'){
//             console.log('yay')
//             init()
//             return;
//         }
//         console.log('exiting')
//     });
// }
// init();


inquirer.prompt(tasks).then((answers) => {
    // let bar = answers
    // console.log(bar)
    // console.log(answers.choice)
    if (answers.choice === 'view all departments'){
        db.query('SELECT * FROM department', (err,rows)=> {
            console.table(rows)
        })
    }
    
    if (answers.choice === 'view all roles') {
        db.query('SELECT * FROM roles'), (err,rows) => {
            console.log(rows)
        }
    }
    if (answers.choice === 'view all employees') {
        db.query('SELECT * FROM employees'),(err,row) => {
        console.log(row)}
    }

    if (answers.choice === 'add a department') {
        const newDepartment = {
            type: 'input',
            name: 'new_department',
            message: 'Which department would you like to add',
        }

        inquirer.prompt(newDepartment).then((answers) => {
            const sql = `INSERT INTO department (name) VALUES('${answers.new_department}')`
            db.query(sql, (err,result) => {
                if (err){
                    console.log(err)
                }
                console.log(result)
            })  
        })
    }

    if (answers.choice === 'add a role') {
        const newRole = [{
            type: 'input',
            name: 'new_role',
            message:'What new role do you want to add',

        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for this job?',
        },

        {
            type: 'input',
            name: 'department_id',
            message: 'State the department id for this role.',
        }

    ]
    

    inquirer.prompt(newRole).then((answers)  => {
        const sql= `INSERT INTO roles (title, salary, department_id) VALUES('${answers.new_role}','${answers.salary}','${answers.department_id}')`
        db.query(sql, (err,result) => {
            if (err){
                console.log(err)
            }
            console.log(result)
        })
    })
}

if (answers.choice === 'add an employee'){
    const employed = [
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of your employee?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'input',
            name: 'role_id',
            message:"What is the role id of the employee?",
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the id of the empoyee?',
        },
    ]

    inquirer.prompt(employed).then((answers) => {
        const sql = `Insert INTO employee (first_name, last_name, role_id, manager_id) VALUES('${answers.first_name}','${answers.last_name}','${answers.role_id}','${answers.manager_id}')`
        db.query(sql, (err,result) => {
            if (err) {
                console.log(err)
            }
            console.log(result)
        })
    })
}

if (answers.choice === 'update an employee'){
    const sql = `SELECT * FROM employee ;`
    db.query(sql, (err,result) => {
        if (err){
            console.log(err)
        }
        const employedNames = result.map(
            (employee) => `${employee.first_name} ${employee.last_name}`
        )
        const updatedEmployeeQuestions = [
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to update?',
                choice: employedNames
            },
        ]
        inquirer.prompt(updatedEmployeeQuestions).then((answers) => {
            const sql = `SELECT * FROM roles`
            db.query(sql,(err,result) =>{
                if(err){
                    console.log(err)
                }
                const roleName = result.map((role) => role.title)
                const newRoleQuestions = [
                    {
                        type: 'list',
                        name: 'role',
                        message: "Which role do you wish to update?",
                        choice: roleName,
                    },
                ]
            
            inquirer.prompt(newRoleQuestions).then((answers) 

            )
        })
    })
    })
}
})
