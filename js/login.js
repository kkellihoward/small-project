var urlBase = '/LAMPAPI'
var extension = 'php';

var userId = 0;
var firstName = "";
var lastName = "";

function doLogin()
{
    userId = 0;
    firstName = "";
    lastName = "";

    var login = document.getElementById("loginName").value;
    var password = document.getElementById("loginPassword").value;
    var hash = md5( password );

    document.getElementById("loginResult").innerHTML = "";
    document.getElementById("emptyResult").innerHTML = "";
    
    if( login == "" || password == "")
    {
        document.getElementById("emptyResult").innerHTML = "*All fields are required";
        document.getElementById("loginResult").style.display = none;
        return;
    }
    
    var tmp = {login:login,password:hash};
    let jsonPayload = JSON.stringify(tmp);

    var url = urlBase + '/Login.' + extension;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                var jsonObject = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                userId = jsonObject.id;
                
                if(userId < 1)
                {
                    document.getElementById("loginResult").innerHTML = "*The user/password combination is incorrect";
                    document.getElementById("emptyResult").style.display = none;
                    return;
                }

                firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();

                window.location.href = "signUp.html";
            }
        }
        xhr.send(jsonPayload);
    }
    catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}
