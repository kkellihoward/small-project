let urlBase = '/LAMPAPI';
let extension = 'php';
let fName, lName, uName, pass1, pass2;

function addUser()
{
    //storing values from user inputs to variables
    let firstName = document.getElementById("first").value;
    let lastName = document.getElementById("last").value;
    let userName = document.getElementById("user").value;
    let userPass = document.getElementById("pass").value;

    //storing inner html to be populated later
    document.getElementById("isEmpty").innerHTML = "";
    document.getElementById("notValid").innerHTML = "";
    document.getElementById("accountCreated").innerHTML = "";
    document.getElementById("duplicateAccount").innerHTML = "";

    //storing first, last, user and pass to make call to database
    let tmp = {firstName:firstName, lastName:lastName, login:userName, password:userPass};
    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/Register.' + extension;
    //connecting to database
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                //try to parse the response text and check the length or the error returned from json
                try
                {
                    let response = JSON.parse(xhr.responseText)
                    //if there is an error message returned, it is because there are duplicate accounts
                    if(response.error.length > 0)
                    {   
                        //setting inner html and returning to index page
                        document.getElementById("duplicateAccount").innerHTML = "*Duplicate Account, redirecting to Login Page";
                        setTimeout(delay2, 2000);
                        return;
                    }
                }
                
                catch{}
                //if there is no error, the account was created and returned user to manager page
                document.getElementById("accountCreated").innerHTML = "Account was created sucessfully! Returning to login page!";
                setTimeout(delay, 2000);
                //}
            
                //delay to manager page
                function delay () {
                    window.location.href = "manager.html";
                }
                
                //delay to index
                function delay2 () {
                    window.location.href = "index.html";
                }
            }
        }
        xhr.send(jsonPayload);

    }
    catch(err)
	{
		document.getElementById("isEmpty").innerHTML = err.error;
	}
}

//function to verify if password meets strength requirements
function checkPassword(password) {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }

function isValid()
{
    //grabbing values from html fields
    let fName = document.getElementById("first").value;
    let lName = document.getElementById("last").value;
    let uName = document.getElementById("user").value;
    let pass1 = document.getElementById("pass").value; 
    let pass2 = document.getElementById("pass2").value;
    let hash1 = md5(pass1);
    let hash2 = md5(pass2);

    //setting up inner html
    document.getElementById("notValid").innerHTML = "";
    document.getElementById("isEmpty").innerHTML = "";
    document.getElementById("isSecure").innerHTML = "";

    //checking if the values are completed by user
    if( fName == "" || lName == "" || uName == "" || pass1 == "" || pass2 == "")
    {
        document.getElementById("isEmpty").innerHTML = "*All fields are required";
        return;
    }
    //checking to see if the password and verify password fields match
    if(hash1 != hash2)
    {
        document.getElementById("notValid").innerHTML = "*Passwords do not match";
        return;
    }
    //checking if password does not meet requirements
    if(checkPassword(pass1) == false)
    {
        document.getElementById("isSecure").innerHTML = "*The Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character.";
        return;
    }
    //else try to add user
    addUser();    
}

