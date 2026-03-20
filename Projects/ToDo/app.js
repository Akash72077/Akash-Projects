let todo= [];

let req= prompt("please enter your request");

console.log(req);

while (true) {
    if(req=="quit"){
        console.log("quitting app");
        break;
    }
    if(req=="list"){
        console.log("--------------------");
        for(let task of todo){
            console.log(task);
        }
    }else if(req=="add"){
       let task= prompt("Please enter the task you wanted to add");
        todo.push(task);
        console.log("task added");
       
    }    
    req= prompt("please enter your request");
   // else if(req== "delete")
}