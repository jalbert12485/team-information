// Requires the employee constructor we already made
const Employee = require("./Employee");

// TODO: Write code to define and export the Engineer class.  We take properties we can from employee class, then add in the additional information we need.
class Engineer extends Employee{
    constructor(name, id, email, github){
    super(name, id, email);
    this.role="Engineer";  
    this.github=github;
    this.getGithub=()=>this.github;}
}

module.exports=Engineer;