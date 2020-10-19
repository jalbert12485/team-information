// This function creates the front end .js file.  Here, we take the list of employees from employee.txt.  We then create the js file in such a way that is now a variable.  Within the frontend .js we tell how to display the employees within a list.  Then, when one of the name is clicked on, that employees card will show in the focus area of the html page.

const fs=require("fs");

function renderJs(employeeList){

    let empList=JSON.stringify(employeeList);
      
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



module.exports=renderJs;