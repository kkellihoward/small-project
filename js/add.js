//let urlBase = '/LAMPAPI';
//let extension = 'php';
//let userId = -1;

function addContact()
{
    readCookie();

    //storing values from user inputs to variables
    let firstName = document.getElementById("first").value;
    let lastName = document.getElementById("last").value;
    let email1 = document.getElementById("email").value;
    let phone1 = document.getElementById("phone").value;

    //storing inner html to be populated later
    document.getElementById("contactAddResult").innerHTML = "";
    document.getElementById("duplicateContact").innerHTML = "";
    
    //storing first, last, email and phone to make call to database
    let tmp = {userId:userId, firstName:firstName, lastName:lastName, email:email1, phone:phone1};
    let jsonPayload = JSON.stringify(tmp);
    console.log(jsonPayload);

    let url = urlBase + '/AddContact.' + extension;
    //connecting to database
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                try
                {
                    let response = JSON.parse(xhr.responseText)
                    //if there is an error message returned, it is because there are duplicate contact
                    if(response.error.length > 0)
                    {   
                        //setting inner html and returning to index page
                        document.getElementById("invalidFormat1").innerHTML = "*Phone/Email is already in the system, please try searching!";
                        return;
                    }
                }
                catch{}
                document.getElementById("contactAddResult").innerHTML = "Contact has been added!";
            }
        }
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }
}

function emailFormat(email)
{
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;;
    return regex.test(email);
}

function phoneFormat(phone)
{
    var regex = /^\d{3}-\d{3}-\d{4}$/;
    return regex.test(phone);
}

function checkFormat()
{
    let firstName = document.getElementById("first").value;
    let lastName = document.getElementById("last").value;
    let email1 = document.getElementById("email").value;
    let phone1 = document.getElementById("phone").value;

    document.getElementById("invalidFormat1").innerHTML = "";
    document.getElementById("oneField").innerHTML = "";

    if(firstName == "" || lastName == "" || email1 == "" || phone1 == "")
    {
        document.getElementById("invalidFormat1").innerHTML = "*All fields are required";
        return;
    }

    
    if((emailFormat(email1) == false) || (phoneFormat(phone1) == false))
    {
        document.getElementById("invalidFormat1").innerHTML = "*Email/Phone format is incorrect";
        return;    
    }

    addContact();
}

function readCookie()
{
	userId = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for(let i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
}