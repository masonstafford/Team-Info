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

    var myTeam = [];
    var myTeamNumberSize;

    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "noOfTeamMem"
        }
    ).then((data) => {
        myTeamNumberSize = data.noOfTeamMem + 1;
    });

    if (myTeamNumberSize === 0) {
        console.log("Hmmmmm, no team then? Ok!");
        return;
    }

    for (i = 1; i < myTeamNumberSize; i++) {
        let name;
        let id;
        let title;
        let email;

        await inquirer.prompt([
            {
                type: "input",
                message: `Please enter employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `Please enter employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `Please enter employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `Please enter employee (${i})'s job role?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ]).then((data) => {
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        switch (title) {
            case "Manager":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter the Manager's office number?",
                        name: "officeNo"
                    }
                ]).then((data) => {
                    const manager = new Manager(name, id, email, data.officeNo);
                    teamMember = fs.readFileSync("templates/manager.html");
                    myTeam = myTeam + "\n" + eval('`' + teamMember + '`');
                }); break;

            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter the interns school",
                        name: "school"
                    }
                ]).then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    myTeam = myTeam + "\n" + eval('`' + teamMember + '`');
                }); break;

            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "Please enter the engineer's GitHub?",
                        name: "github"
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
}
start();