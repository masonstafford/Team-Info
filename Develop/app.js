const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const path = require('path');
const Engineer = require("./lib/Engineer");

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');

const myTeam = [];
const idArr = [];


const init = () => {
    const createManager = () => {
        inquirer.prompt([
            {
                type: "input",
                message: `What is you manager's name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is you manager's id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is you manager's Email?`,
                name: "email"
            },
            {
                type: "input",
                message: `What is you manager's office number?`,
                name: "officeNumber"
            }
        ]).then((data) => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            myTeam.push(manager);
            idArr.push(data.id);
            createTeamMember();
        });
    }
    
    const createEngineer = () => {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your engineer's id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your engineer's GitHub?",
                name: "github"
            }
        ]).then((data) => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github);
            myTeam.push(engineer);
            idArr.push(data.id);
            createTeamMember();
        });
    }

    const createIntern = () => {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "name"
            },
            {
                type: "input",
                message: "What is your intern's id?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your intern's school?",
                name: "school"
            }
        ]).then((data) => {
            const intern = new Intern(data.name, data.id, data.email, data.school);
            myTeam.push(intern);
            idArr.push(data.id);
            createTeamMember();
        });
    }

    const createTeamMember = () => {
        inquirer.prompt([
            {
                type: "list",
                message: "What kind of team memver would you like to add?",
                name: "createId",
                choices: ["Engineer", "Intern", "I would not like to add another team member"]
            }
        ]).then(choices => {
            switch (choices.createId) {
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;   
                default:
                    makeTheTeam()
                    console.log("Created dream team!");      
            }
        })
    }
    function makeTheTeam() {
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(myTeam), "utf8");
    }
    createManager();
};

init();