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

    document.getElementById("loginResult").innerHTML = "";
    
    if( login == "" || password == "")
    {
        alert("Please fill out empty fields");
        return;
    }
    
    var tmp = {login:login,password:password};
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
                console.log("here")
                var jsonObject = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
                userId = jsonObject.id;
                
                if(userId < 1)
                {
                    document.getElementById("loginResult").innerHTML = "The user/password combination is incorrect";
                    return;
                }
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