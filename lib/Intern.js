const Employee = require("./Employee");

// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
function Intern(name, id, email, school){
    const intern=new Employee(name, id, email);
    intern.role="Intern";  
    intern.school=school;
    intern.getSchool=()=>intern.school;
    return intern;
}

module.exports=Intern;