const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
function Engineer(name, id, email, github){
    const engineer=new Employee(name, id, email);
    engineer.role="Engineer";  
    engineer.github=github;
    engineer.getGithub=()=>engineer.github;
    return engineer;
}

module.exports=Engineer;