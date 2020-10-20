// Require constants, including packages and self made nodes in lib.

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Question = require("./lib/Question");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Employee = require("./lib/Employee");
const renderHtml = require("./lib/renderhtml");
const renderJs = require("./lib/renderjs");



// Declaring variables for employee information.
let role;
let name;
let id; 
let email;
let extraInfo;
let employees=[];

// Creating an array of questions to give to inquirer so that we don't have to put them in earlier.

const roleQuestion=[new Question("input", "What is the role of the employee?","role")];
const idQuestion=[new Question("input", "What is the employee ID?", "id")];
const employeeQuestions=[new Question("input", "What is the employee's name?","name"), ...idQuestion ,new Question("email", "What is the employee's email?", "email")];
const specificQuestions={   manager: [new Question("input", "What is the employee's office number?","extraInfo")],
                            engineer:[new Question("input", "What is the employee's GitHub user name?","extraInfo")],
                            intern: [new Question("input", "What is the employee's school?","extraInfo")] };


// Gets the existing employee information from the saved file.
fs.readFile("employee.txt","utf8",function(err,data){
    if(err) throw err;

    employees=JSON.parse(data);
    purpose();
});




// Gets user input to determine if they want to add, remove or display team information.  Then sends off to the next functions based on that input.

function purpose(){
 
  inquirer
    .prompt( [{ 
      type: "list",
      message: "Do you want to add, remove or display team members?",
      choices: ["Add","Remove","Display","Stop"],
      name: "choice"
    }]
      
  )
    .then(function(response) {
 
      switch (response.choice){
          case "Add":
            determineRole();
            break;
          case "Remove":
            removeMember();
            break;
          case "Display":
            render(employees);
            console.log("Open index.html in browser to view team.");
            break;
          case "Stop":
            process.exit();
      }
  
    });


 
  }

// If the user wants to add a user, we determine what role the user will assign to the new employee.  We then run validation on the input.

function determineRole(){
inquirer
  .prompt( roleQuestion
    
)
  .then(function(response) {
    role=response.role.toLowerCase();
    if(role=="manager"){
      for(let i=0; i<employees.length;i++){
        if(employees[i].role="Manager"){
          console.log("Error: You can only have one manager of the team.  Please remove existing manager if you would like to add another.");
          process.exit();;
        }
      }
    }
    if(!(role == "manager" || role=="engineer" || role=="intern")){
        console.log("Error: Role must be manager, engineer or intern");
        process.exit();
    }
    remainingQuest();


  });}


//  After determining the role of the new employee, we will ask for the relevant information needed for that employee.

function remainingQuest() {
  let remainingQuestions=employeeQuestions.concat(specificQuestions[`${role}`]);

  inquirer
      .prompt( remainingQuestions

      )
      .then(function(response) {
          name=response.name;
          id=response.id;
          email=response.email;
          extraInfo=response.extraInfo;

          for(let i=0; i<employees.length; i++){
            if(id==employees[i].id){
              throw "Error: You may only have one employee assigned this ID."
            }
          }

          let inputEmployee;
          switch(role){
              case "manager":
                  inputEmployee=new Manager(name, id, email, extraInfo);
                  break;
              case "engineer":
                  inputEmployee=new Engineer(name, id, email, extraInfo);
                  break;
              case "intern":
                  inputEmployee=new Intern(name, id, email, extraInfo);
                  break;
          }
          employees.push(inputEmployee);
          fs.writeFile("employee.txt",JSON.stringify(employees, null, 2), err=> {if(err) throw err;});
          purpose();

      });}

      // If the user wants to display the information, this function is called.  It will call the render Html and render Js functions from my created modules.  The first ones creates an html file, the second creates a front end js file.

      function render(employeeList){
        renderHtml();
        renderJs(employeeList);
      }

      // If the user wants to remove an employee, we ask for the employee ID.  We then validate the input and remove the employee if the id exists. 
      
      function removeMember(){
        inquirer
        .prompt( idQuestion
          
      )
        .then(function(response) {
          if(response.id=="All"){ 
            employees=[];             
            fs.writeFile("employee.txt",JSON.stringify(employees, null, 2), err=> {if(err) throw err;}); 
            return;}
          let remEmp;
          for(let i=0; i < employees.length; i++){
            if(employees[i].id==response.id){
              remEmp=i;
            }
          }
          if(remEmp != null){
            employees.splice(remEmp,1);
            fs.writeFile("employee.txt",JSON.stringify(employees, null, 2), err=> {if(err) throw err;});
            console.log("Team member removed.")
          }else{
            throw "Error: There is no employee with this ID."
          }
          purpose();
        });

      }