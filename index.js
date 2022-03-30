const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');


const db = mysql.createConnection(
    {
        user: 'root',
        database: 'employee_manager_db'
    },
    console.log(`Connected to the employee_management database.`)
);


const initialQuestion = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Add an employee', 'Add a department', 'Add a Role', 'View all roles', 'View all employees', 'View all departments', 'update an employee role', 'Exit'],
    name: 'initialQuestion'
}

const addDepartmentQuestion = {
    type: 'input',
    message: 'What department would you like to add?',
    name: 'department',
};

const viewAllRoles = {
    // some how have to list out all roles in db
};

const viewAllDepartments = function () {
    db.query('SELECT * FROM department', function (err, data) {
        console.table(data)
        prompts()
    })
};

const viewAllEmployees = function () {
    db.query('SELECT * FROM employee', function (err, data) {
        console.table(data)
        prompts()
    })
};

var updateEmployeeArr = function(){
    db.query('SELECT * FROM roles', async function (err, data) {
        console.log(data)
        var allRoles = data.map(function (role) {
            return {
                name: role.title,
                value: role.id,
            }
        })
        db.query('SELECT * FROM employee', async function (err, data) {
            var allEmps = data.map(function (employee) {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id,
                }
             
        })
        

       
            
         var updateQuestions =
    [{

        type: "list",
        message: "Which employee's role do you want to update?",
        choices: allEmps,
        name: "employeeroleupdate",
    },
    {
        type: "list",
        message: "What role do you want to assign this employee?",
        choices: allRoles,
        name: "employeeassignrole",
    },
    ]
    inquirer.prompt(updateQuestions).then(function (answers) {
        db.query(`INSERT INTO employee (role.first_name, roles_id) VALUES ("${answers.employeeroleupdate}", "${answers.employeeassignrole}")`, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                prompts()
            }
        }
    )})
}) })
}


const addDepartment = function () {
    inquirer.prompt(addDepartmentQuestion).then(function (answers) {
        db.query(`INSERT INTO department (department_name) VALUES ("${answers.department}")`, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                prompts()
            }
        })
    })
}

const viewEmployees = function () {
    inquirer.prompt(viewAllEmployees).then(function (answers) {

        prompts()
    })
}

const addEmployee = async function () {
    db.query('SELECT * FROM roles', async function (err, data) {
        var roleChoices = data.map(function (role) {
            return {
                name: role.title,
                value: role.id,
            }
        })
        db.query('SELECT * FROM employee', async function (err, data) {
            var allEmps = data.map(function (employee) {
                return {
                    name: employee.first_name + ' ' + employee.last_name,
                    value: employee.id,
                }
             
        })
    
         

        console.log(roleChoices)


        var questions = [{

            type: "input",
            message: "What is employee's first name?",
            name: "firstname",
        },
        {
            type: "input",
            message: "What is employee's last name?",
            name: "lastname",
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            choices: allEmps,
            name: "employeemanager",
        },
        {
            type: "list",
            message: "What is employee's role?",
            choices: roleChoices,
            name: "employeerole",
        }
        ]


        inquirer.prompt(questions).then(function (answers) {
            db.query(`INSERT INTO employee (first_name, last_name, manager_id, roles_id) VALUES ("${answers.firstname}", "${answers.lastname}", "${answers.employeemanager}", "${answers.employeerole}")`, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    prompts()
                }
            })
        })
    })
    })

}


const addRole = async function () {
    db.query('SELECT * FROM department', async function (err, data) {
        var departmentChoices = data.map(function (department) {
            return {
                name: department.department_name,
                value: department.id,
            }
        
        })
        console.log(departmentChoices)
        var questions =
            [{
                type: 'input',
                message: 'What role would you like to add?',
                name: 'role',
            },
            {
                type: 'input',
                message: 'What is the salary of this role?',
                name: 'salary',
            },
            {
                type: 'choices',
                message: 'What department does this role belong to?',
                choices: [departmentChoices],
                name: 'deptrole',
            }
            ];
            inquirer.prompt(questions).then(function (answers) {
                db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${answers.role}", "${answers.salary}", "${answers.deptrole}")`, function (err, data) {
                    if (err) {
                        console.log(err)
                    } else {
                        prompts()
                    }
                })
            })
    }
    )
}

const viewRoles = function () {
    inquirer.prompt(viewAllRoles).then(function (answers) {
        db.query('SELECT * FROM roles', function (err, data) {
            console.table(data)
            prompts()
        })
    }
    )}

const viewDepartments = function () {
    inquirer.prompt(viewAllDepartments).then(function (answers) {

        prompts()
    })
}

const employeeQuestion = function () {
    inquirer.prompt(employeeQuestionArr).then(function (answers) {

        prompts()
    })
}

const updateEmployee = function () {
    inquirer.prompt(updateQuestions).then(function (answers) {

        prompts()
    })
}

function prompts() {
    inquirer.prompt(initialQuestion).then((answer) => {
        if (answer.initialQuestion === 'Add an employee') {
            addEmployee()
        }
        else if (answer.initialQuestion === 'Add a department') {
            addDepartment()
        } else if (answer.initialQuestion === 'Add a Role') {
            addRole()
        }
        else if (answer.initialQuestion === 'View all roles') {
            viewRoles()
        }
        else if (answer.initialQuestion === 'View all employees') {
            viewAllEmployees()
        }
        else if (answer.initialQuestion === 'View all departments') {
            viewAllDepartments()
        }
        else if (answer.initialQuestion === 'update an employee role') {
            updateEmployeeArr()
        }
        else {
            console.log('DONE')

            return
        }
    }
    )
}


prompts();