async function register(){

const username=document.getElementById("username").value;

const email=document.getElementById("email").value;

const password=document.getElementById("password").value;

if(!username || !email || !password){

alert("Fill all fields");

return;

}

const response=await fetch("https://ai-project-evaluator-gqe8.onrender.com/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username,

email,

password

})

});

const data=await response.json();

if(response.ok){

alert("Registration Successful");

window.location.href="login.html";

}

else{

alert(data.message);

}

}