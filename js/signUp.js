var urlBase = '/LAMPAPI'
var extension = 'php';
var fName, lName, uName, pass1, pass2;

function addUser()
{
    var firstName = document.getElementByI("first").value;
    var lastName = document.getElementById("last").value;
    var userName = document.getElementById("user").value;
    var userPass = document.getElementById("pass").value;

    var tmp = {firstName:firstName, lastName:lastName, login:userName, password:userPass};
    let jsonPayload = JSON.stringify(tmp);

    var url = urlBase + '/Register.' + extension;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                var jsonObject = JSON.parse(xhr.responseText);
            }
        }
        xhr.send(jsonPayload);
    }
    catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
        //document.getElementById("emptyResult").style.display = none;
	}
}

