const { faker, da } = require('@faker-js/faker');
const mysql = require('mysql2');

// Create the connection to database

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'akash',
  password:  'Akash@12345'
});

let getRandomUser=()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// inserting new data 
let q="Insert into user (id, username , email , password) values ?";
// let user= ["123", "Sai@72077","sai.sai72077@gmail.com","Akash@12345"];

let data=[];
for(let i=1; i<=100; i++){
  data.push(getRandomUser());

}
console.log(data);
console.log(data.length);



try{
    connection.query(q, [data],(err, result)=>{
        if(err) throw err;
        console.log(result);        
    });
} catch(err){
    console.log(err);
    
}

connection.end();
