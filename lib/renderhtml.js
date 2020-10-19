// Here we write the html file.  Note that, this function isn't neccessary since there are no changes based on the information that we collect.  If we instead used a static html file, it would work just as well.  (See html for notes on the set up of that).

const fs=require("fs");

function renderHtml(){
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

}


module.exports=renderHtml;