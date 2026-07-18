async function login(){

    const email=document.getElementById("email").value;
    const password=document.getElementById("password").value;


    const response=await fetch("http://127.0.0.1:5000/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:email,
            password:password

        })

    });


    const data=await response.json();


    if(response.ok){

        localStorage.setItem(
            "token",
            data.access_token
        );

        localStorage.setItem(
            "username",
            data.username
        );


        alert("Login Successful");

        window.location="index.html";

    }

    else{

        alert(data.message);

    }

}


























