const employees=[{"name":"Justin Albert","id":"1","email":"jalbert@carthage.edu","role":"Manager","officeNumber":"1"},{"name":"Arthur","id":"2","email":"arthur@gmail.com","role":"Engineer","github":"arthur"},{"name":"Teddy","id":"3","email":"teddy@gmail.com","role":"Intern","school":"Home"},{"name":"Paula","id":"4","email":"paula@gmail.com","role":"Engineer","github":"paula"}];
      
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
          $("#card-email").html(`<a href='${viewedEmployee.email}'>Email: ${viewedEmployee.email}`);
          switch (viewedEmployee.role){
              case "Manager":
                  $("#card-extra").text(`Office Number: ${viewedEmployee.officeNumber}`);
                  break;
              case "Engineer":
                  $("#card-extra").text(`Github: ${viewedEmployee.github}`);
                  break;
              case "Intern":
                  $("#card-extra").text(`School: ${viewedEmployee.school}`);
                  break;
          }
        
      
      }
      
      displayEmployeeList();
      $("#emp-list").on("click",".emp",function(){
         displayCard(this.dataset.id);
      });
      
      displayCard(viewedEmployee.id);