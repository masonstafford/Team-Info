const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const path = require('path');
const Engineer = require("./lib/Engineer");

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./lib/htmlRenderer');


async function start() {
    console.log("Please build your team");

    const myTeam = [];

   await inquirer.prompt([
        {
            type: "input",
            message: `What is you manager's first name?`,
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
            name: "email"
        },
        {
            type: "list",
            message: `Which type of team member would you like to add?`,
            name: "title",
            choices: ["Engineer", "Intern", "Done"]
        }
    ]).then((data) => {
        const intern = new Intern(name, id, email, data.school);
        teamMember = fs.readFileSync("templates/intern.html");
        myTeam = myTeam + "\n" + eval('`' + teamMember + '`');
    });

    switch (title) {

        case "Intern":
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
                },
                {
                    type: "list",
                    message: `Which type of team member would you like to add?`,
                    name: "title",
                    choices: ["Engineer", "Intern", "Done"]
                }
            ]).then((data) => {
                const intern = new Intern(name, id, email, data.school);
                teamMember = fs.readFileSync("templates/intern.html");
                myTeam = myTeam + "\n" + eval('`' + teamMember + '`');
            }); break;

        case "Engineer":
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
                },
                {
                    type: "list",
                    message: `Which type of team member would you like to add?`,
                    name: "title",
                    choices: ["Engineer", "Intern", "Done"]
                }
            ]).then((data) => {
                const engineer = new Engineer(name, id, email, data.github);
                teamMember = fs.readFileSync("templates/engineer.html");
                myTeam = myTeam + "\n" + eval('`' + teamMember + '`');
            }); break;
    }
}
fs.writeFile(outputPath, render(myTeam), function (err) {
    console.log(myTeam)
    if (err) {
        return console.log(err);
    }
});
start();




    // var myTeamNumberSize;

    // inquirer.prompt(
    //     {
    //         type: "number",
    //         message: "How many people are in your team?",
    //         name: "noOfTeamMem"
    //     }
    // ).then((data) => {
    //     myTeamNumberSize = data.noOfTeamMem + 1;
    // });

    // if (myTeamNumberSize === 0) {
    //     console.log("Hmmmmm, no team then? Ok!");
    //     return;
    // }

    // for (i = 1; i < myTeamNumberSize; i++) {
    //     let name;
    //     let id;
    //     let title;
    //     let email;