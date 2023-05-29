var urlBase = '/LAMPAPI'
var extension = 'php';
var fName, lName, uName, pass1, pass2;

function addUser()
{
    var firstName = document.getElementById("first").value;
    var lastName = document.getElementById("last").value;
    var userName = document.getElementById("user").value;
    var userPass = document.getElementById("pass").value;

    document.getElementById("isEmpty").innerHTML = "";
    document.getElementById("notValid").innerHTML = "";
    document.getElementById("accountCreated").innerHTML = "";

    var tmp = {firstName:firstName, lastName:lastName, login:userName, password:userPass};
    let jsonPayload = JSON.stringify(tmp);

    var url = urlBase + '/Register.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
                document.getElementById("accountCreated").innerHTML = "Account was created sucessfully! Returning to login page!";
            
            setTimeout(delay, 1000);

            function delay () {
                window.location.href = "index.html";
            }
        }
        xhr.send(jsonPayload);

    }
    catch(err)
	{
		document.getElementById("isEmpty").innerHTML = err.message;
	}
}


function isValid()
{
    var fName = document.getElementById("first").value;
    var lName = document.getElementById("last").value;
    var uName = document.getElementById("user").value;
    var pass1 = document.getElementById("pass").value; 
    var pass2 = document.getElementById("pass2").value;
    var hash1 = md5(pass1);
    var hash2 = md5(pass2);

    document.getElementById("notValid").innerHTML = "";
    document.getElementById("isEmpty").innerHTML = "";

    if( fName == "" || lName == "" || uName == "" || pass1 == "" || pass2 == "")
    {
        document.getElementById("isEmpty").innerHTML = "*All fields are required";
        return;
    }

    if(hash1 != hash2)
    {
        document.getElementById("notValid").innerHTML = "*Passwords do not match";
        return;
    }
    addUser();    
}

