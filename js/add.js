var urlBase = '/LAMPAPI';
var extension = 'php';

function addContact()
{
    var firstName = document.getElementById("first").value;
    var lastName = document.getElementById("last").value;
    var email1 = document.getElementById("email").value;
    var phone1 = document.getElementById("phone").value;

    document.getElementById("contactAddResult").innerHTML = "";

    var tmp = {firstName:firstName, lastName:lastName, email:email1, phone:phone1};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/AddContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("contactAddResult").innerHTML = "Contact has been added!";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }
}

function verifyAdd()
{
    var email2 = document.getElementById("email").value;
    var phone2 = document.getElementById("phone").value;
    document.getElementById("contactAlreadyAdded").innerHTML = " ";

    var tmp = {email:email2, phone:phone2};
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/AddContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        addContact();
    }
    catch(err)
    {
        document.getElementById("contactAlreadyAdded").innerHTML = "*We have found a record of the email or phone. Please try searching instead";
    }

}
