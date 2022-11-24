
// Store the content in localstorage 
function store(){

    var name = document.getElementById('name').value;
    var pw = document.getElementById('pw').value;

    if(name.length == 0){
        alert('Please fill in username');

    }else if(pw.length == 0){
        alert('Please fill in password');

    }else if(name.length == 0 && pw.length == 0){
        alert('Please fill in username and password');

    }else if(pw.length > 8){
        alert('Reached maximum length');
    }

    else{
        if(name in localStorage)
        {
            alert("Username already exist,Try another");
        }
        else
        {   
            localStorage.setItem(name,pw);
            alert("Account Created Successfully");
            window.open("/","_self");
        }
    }
}

//checking
function check(){
    var userName = document.getElementById('userName').value;
    var userPw = document.getElementById('userPw').value;

    var key;
    var validate = 0;
    // Loop throught localstorage username (Key)
    for(var i = 0, len = localStorage.length; i < len; i++)
    {
        if(userName == localStorage.key(i))
        {
            if(userPw == localStorage.getItem(localStorage.key(i)))
            {
                alert("Login Successfull 😁")
                window.open("/music-app","_self")
                break;
            } else {
                alert("Incorrect Password ..")
                break;
            }
        }else {
            validate = 1;
        }
    }

    if(validate == 1) {
        alert("Username doesn't match account");
    }
}