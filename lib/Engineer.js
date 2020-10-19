// Requires the employee constructor we already made
const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  We take properties we can from employee class, then add in the additional information we need.
function Engineer(name, id, email, github){
    const engineer=new Employee(name, id, email);
    engineer.role="Engineer";  
    engineer.github=github;
    engineer.getGithub=()=>engineer.github;
    return engineer;
}

module.exports=Engineer;