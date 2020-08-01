const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// function to build team members
const teamMembers = [];
function write() {
    let path = render(teamMembers)
    fs.writeFile(outputPath, path, function (error) {
        if (error) {
            console.log(error);
            throw error;
        };
        console.log("The team.html file created success!");
    })
}

//
function createTeam() {
    return inquirer.prompt([
        {
            type: "list",
            name: "teamChoice",
            message: "Would you like to add a team member",
            choices: [
                "Manager",
                'Engineer',
                'Intern',
                'I do not want to add more team members'
            ]
        }
    ]).then(function (userChoice) {
        switch (userChoice.teamChoice) {
            case "Manager":
                addManager();
                break;
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
            case "I do not want to add more team members":
                write();
                break;
        }
    })
    function addManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your manager's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is your manager's id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your manager's email?"
            },
            {
                type: "input",
                name: "officeNumber",
                message: "What is your manager's office number?"
            },
        ])
            .then(userChoice => {
                const manager = new Manager(userChoice.name, userChoice.id, userChoice.email, userChoice.officeNumber)
                teamMembers.push(manager)
                console.log(teamMembers);
                createTeam();
            })
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your engineer's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is your engineer's id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your engineer's email?"
            },
            {
                type: "input",
                name: "gitHub",
                message: "What is your engineer's GitHub username?"
            },
        ])
            .then(userChoice => {
                const engineer = new Engineer(userChoice.name, userChoice.id, userChoice.email, userChoice.gitHub)
                teamMembers.push(engineer)
                console.log(teamMembers);
                createTeam();
            })
    }
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is your intern's name?"
            },
            {
                type: "input",
                name: "id",
                message: "What is your intern's id?"
            },
            {
                type: "input",
                name: "email",
                message: "What is your intern's email?"
            },
            {
                type: "input",
                name: "school",
                message: "What is your intern's school?"
            },
        ])
            .then(userChoice => {
                const intern = new Intern(userChoice.name, userChoice.id, userChoice.email, userChoice.school)
                teamMembers.push(intern)
                console.log(teamMembers);
                createTeam();
            })
    }
}
createTeam();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```