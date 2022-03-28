const inquirer = require('inquirer');


const initialQuestion = {
    type: 'list',
    message: 'What would you like to do?',
    choices: ['Add an employee', 'Add a department', 'Add a Role', 'View all roles', 'View all employees', 'update an employee role', 'Exit'],
    name: 'initialQuestion'
}

const addRoleQuestion = [{
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
    choices: [ /*insert department choices */],
    name: 'deptrole',
}
];

const addDepartmentQuestion = {
    type: 'input',
    message: 'What department would you like to add?',
    name: 'department',
};

const viewAllRoles = {
    // some how have to list out all roles in db
};

const viewAllDepartmens = {
    // some how have to list out all departments in db
};


var employeeQuestionArr =
    [{

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
        message: "What is employee's role?",
        choices: [ /* roles here */],
        name: "employeerole",
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        choices: [ /* managers */],
        name: "employeemanager",
    }
    ]
var internQuestionArr =
    [{

        type: "input",
        message: "Please enter your name",
        name: "name",
    },
    {
        type: "input",
        message: "What is your id Number?",
        name: "id",
    },
    {
        type: "input",
        message: "What is your email?",
        name: "email",
    },
    {
        type: 'input',
        message: 'What is your school',
        name: 'school'
    }
    ]
var updateEmployeeArr =
    [{

        type: "list",
        message: "Which employee's role do you want to update?",
        choices: [/* list employees */],
        name: "employeeroleupdate",
    },
    {
        type: "list",
        message: "What role do you want to assign this employee?",
        choices: [/* list of roles */],
        name: "employeeassignrole",
    },
    ]

const internQuestions = function () {
    inquirer.prompt(internQuestionArr).then(function (answers) {

        var newIntern = new Intern(answers.id, answers.name, answers.email, answers.school)
        team.push(newIntern)
        prompts()
    })
}


const mgrQuestions = function () {
    inquirer.prompt(mgrQuestionArr).then(function (answers) {

        var newManager = new Manager(answers.id, answers.name, answers.email, answers.officeNum)
        team.push(newManager)

        prompts()

    })
}

const engineerQuestions = function () {
    inquirer.prompt(engineerQuestionArr).then(function (answers) {

        var newEngineer = new Engineer(answers.id, answers.name, answers.email, answers.gitHub)
        team.push(newEngineer)

        prompts()
    })
}

function prompts() {
    inquirer.prompt(initialQuestion).then((answer) => {
        if (answer.initialQuestion === 'Add a member') {
            inquirer.prompt(addRoleQuestion).then((answer) => {
                if (answer.role === 'Manager') {
                    mgrQuestions()
                } else if (answer.role === 'Intern') {
                    internQuestions()
                }
                else if (answer.role === 'Engineer') {
                    engineerQuestions()
                }
            }
            )
        }
        else {
            console.log(team)
            fs.writeFile('./dist/index.html', generateHtml(team), function () {
                console.log('success')
            })
            return
        }
    }
    )
}


prompts();