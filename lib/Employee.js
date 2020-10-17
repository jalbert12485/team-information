// TODO: Write code to define and export the Employee class
function Employee(name, id, email){
    this.name=name,
    this.id=id,
    this.email=email,
    this.role="Employee";
    this.getName= ()=> this.name;
    this.getId= ()=> this.id;
    this.getEmail= ()=> this.email;
    this.getRole= () => this.role;  
}

module.exports=Employee;