const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Question = require("./lib/Question");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const Employee = require("./lib/Employee");






let role;
let name;
let id; 
let email;
let extraInfo;
let employees=[];

const roleQuestion=[new Question("input", "What is the role of the employee?","role")];
const idQuestion=[new Question("input", "What is the employee ID?", "id")];
const employeeQuestions=[new Question("input", "What is the employee's name?","name"), ...idQuestion ,new Question("email", "What is the employee's email?", "email")];
const specificQuestions={   manager: [new Question("input", "What is the employee's office number?","extraInfo")],
                            engineer:[new Question("input", "What is the employee's GitHub user name?","extraInfo")],
                            intern: [new Question("input", "What is the employee's school?","extraInfo")] };



fs.readFile("employee.txt","utf8",function(err,data){
    if(err) throw err;

    employees=JSON.parse(data);
    purpose();
})

function purpose(){
  inquirer
    .prompt( [{ 
      type: "list",
      message: "Do you want to add, remove or display team members?",
      choices: ["Add","Remove","Display"],
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
            console.log("Open index.html in browser");
      }
  
    });}


function determineRole(){
inquirer
  .prompt( roleQuestion
    
)
  .then(function(response) {
    role=response.role.toLowerCase();
    if(role=="manager"){
      for(let i=0; i<employees.length;i++){
        if(employees[i].role="Manager"){
          throw "Error: You can only have one manager of the team.  Please remove existing manager if you would like to add another."
        }
      }
    }
    if(!(role == "manager" || role=="engineer" || role=="intern")){
        throw "Error: Role must be manager, engineer or intern";
    }
    remainingQuest();


  });}



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

      });}

      function render(employees) {
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- BootStrap -->
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
            <title>Document</title>
        </head>
        <body>
            
            <!-- Page title bar -->
            <nav class="navbar navbar-dark bg-secondary">
                <span class="h1 mr-auto ml-auto nav-text" style="color: white">Team Information</span>
            </nav>
        
            <!-- Start of Row -->
            <div class="row">
            
            <!-- List of members -->
            <div class="container col-md-4 col-sm-12 pt-4" id="emp-list">
            <ul class="list-group">
                <li class="list-group-item list-group-item-primary">Team Members</li>
                <li class="list-group-item list-group-item-secondary" > <ul class="list-group" id="manager-list" >Manager  </ul></li>
                <!-- <li class="list-group-item" data-id="Idnumber">Manager name</li> -->
                <li class="list-group-item list-group-item-success" ><ul class="list-group" id="engineer-list"> Engineers</ul></li>
                <!-- <li class="list-group-item" data-id="Idnumber">Engineer Names</li> -->
                <li class="list-group-item list-group-item-info" ><ul class="list-group" id="intern-list">Interns</ul></li>
                <!-- <li class="list-group-item" data-id="Idnumber">Intern Names</li> -->
        
              </ul>
            </div>
        
            <!-- Card -->
            <div class="container col-md-8 col-sm-12 p-4">
            <div class="card mr-auto ml-auto" id="card" style="width: 75%;">
                <div class="card-body">
                  <h3 class="card-title" id="card-name">Name</h3>
                  <h4 class="card-subtitle mb-2 text-muted" id="card-role">Role </h4>
                  <p class="card-text" id="card-id">ID: </p>
                  <p class="card-text" id="card-email"><a href="mailto:" >Email</a></p>
                  <p class="card-text" id="card-extra">Extra-Information </p>
                </div>
              </div>
            </div>
        
        
        
            <!-- end of row -->
            </div>
            <!-- BootStrap -->
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
            <!-- jquery -->
            <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
            <script src="script.js"></script>
        </body>
        </html>`;
      
        fs.writeFile("./index.html",html,err => {if(err) throw err;});
      
        let empList=JSON.stringify(employees);
      
        let jScript=`const employees=${empList};
      
      let viewedEmployee=employees[employees.length-1];
      
      
      function displayEmployeeList(){
          for(let i=0; i< employees.length; i++){
              let newLI=$("<li>");
              newLI.addClass("list-group-item emp");
              newLI.attr("data-id",employees[i].id);
              newLI.text(employees[i].name);
              switch (employees[i].role){
                  case "Manager":
                      $("#manager-list").append(newLI);
                      break;
                  case "Engineer":
                      $("#engineer-list").append(newLI);
                      break;
                  case "Intern":
                      $("#intern-list").append(newLI);
                      break;       
              }
      
      
          }
      }
      
      
      
      function displayCard(employeeId){
      
          for(let i=0; i< employees.length; i++){
              if(employees[i].id==employeeId){
                  viewedEmployee=employees[i];
              }
          }
        
      
          $("#card-name").text(viewedEmployee.name);
          $("#card-role").text(viewedEmployee.role);
          $("#card-id").text("ID: " + viewedEmployee.id);
          $("#card-email").html(\`<a href='\${viewedEmployee.email}'>Email: \${viewedEmployee.email}\`);
          switch (viewedEmployee.role){
              case "Manager":
                  $("#card-extra").text(\`Office Number: \${viewedEmployee.officeNumber}\`);
                  break;
              case "Engineer":
                  $("#card-extra").text(\`Github: \${viewedEmployee.github}\`);
                  break;
              case "Intern":
                  $("#card-extra").text(\`School: \${viewedEmployee.school}\`);
                  break;
          }
        
      
      }
      
      displayEmployeeList();
      $("#emp-list").on("click",".emp",function(){
         displayCard(this.dataset.id);
      });
      
      displayCard(viewedEmployee.id);`;
      
      fs.writeFile("./script.js",jScript,err => {if(err) throw err;}); 
      }
      
      function removeMember(){
        inquirer
        .prompt( idQuestion
          
      )
        .then(function(response) {
          if(response.id="All"){ 
            employees=[];             
            fs.writeFile("employee.txt",JSON.stringify(employees, null, 2), err=> {if(err) throw err;}); return;}
          let remEmp;
          for(let i=0; i < employees.length; i++){
            if(employees[i].id==response.id){
              remEmp=i;
            }
          }
          if(remEmp != null){
            employees.splice(remEmp,1);
            fs.writeFile("employee.txt",JSON.stringify(employees, null, 2), err=> {if(err) throw err;});
          }else{
            throw "Error: There is no employee with this ID."
          }
      
        });

      }