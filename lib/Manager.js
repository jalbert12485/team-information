// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

function Manager(name, id, email, officeNumber){
    const manager=new Employee(name, id, email);
    manager.role= "Manager";  
    manager.officeNumber=officeNumber;
    manager.getOfficeNumber=()=>manager.officeNumber;
    return manager;
}

module.exports=Manager;