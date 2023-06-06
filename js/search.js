var urlBase = '/LAMPAPI';
var extension = 'php';
var userId = -1;

function displayContact(people, index)
{
    let person = JSON.stringify(people);
    let currentContact = JSON.parse(person);


    document.getElementById("addSearchDisplay").style.display = 'none';
    document.getElementById("contactContainer").style.display = 'contents';

    document.getElementById("contactFirst").value = currentContact.firstName;
    document.getElementById("contactFirst").readOnly = true;
    document.getElementById("contactLast").value = currentContact.lastName;
    document.getElementById("contactLast").readOnly = true;
    document.getElementById("contactEmail").value = currentContact.email;
    document.getElementById("contactEmail").readOnly = true;
    document.getElementById("contactPhone").value = currentContact.phone;
    document.getElementById("contactPhone").readOnly = true;
    document.getElementById("contactId").innerHTML = currentContact.id;
    document.getElementById("contactId").style.opacity = "0%";

}

function edit()
{
    document.getElementById("contactFirst").readOnly = false;
    document.getElementById("contactLast").readOnly = false;
    document.getElementById("contactEmail").readOnly = false;
    document.getElementById("contactPhone").readOnly = false;
}

function deleteContact()
{
    var localF = document.getElementById("contactFirst").value;
    var localL = document.getElementById("contactLast").value;

    document.getElementById("contactDeleted").innerHTML = "";

    var tmp = {userId:userId, firstName:localF, lastName:localL};
    console.log(tmp);
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/DeleteContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                document.getElementById("contactDeleted").innerHTML = "Contact has been deleted!";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactUpdateResult").innerHTML = err.message;
    }

}

function update()
{
    var localFirst = document.getElementById("contactFirst").value;
    var localLast = document.getElementById("contactLast").value;
    var localEmail = document.getElementById("contactEmail").value;
    var localPhone = document.getElementById("contactPhone").value; 
    var localId = document.getElementById("contactId").innerHTML; 
    

    document.getElementById("contactUpdateResult").innerHTML = "";
    var tmp = {userId:userId, id : localId, firstName:localFirst, lastName:localLast, email:localEmail, phone:localPhone};
    console.log(tmp);
    let jsonPayload = JSON.stringify( tmp );

    let url = urlBase + '/UpdateContact.' + extension;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if (this.readyState == 4 && this.status == 200) 
            {
                
                document.getElementById("contactUpdateResult").innerHTML = "Contact has been updated!";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactUpdateResult").innerHTML = err.message;
    }
}

function searchContact()
{
    readCookie();
	let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let email = document.getElementById("emailSearch").value;
	let phone = document.getElementById("phoneSearch").value;
	
    document.getElementById("contactSearchResult").innerHTML = " ";
	
	let currentContact;

	var tmp = {firstName:fName, lastName:lName, email:email, phone:phone, userId:userId};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;

    console.log("Searching for: " + jsonPayload)
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
        xhr.onreadystatechange = function() 
		{
            
            console.log(this.readyState + " " + this.status)
			if (this.readyState == 4 && this.status == 200) 
			{
                let searchBody = document.getElementById("searchBody");
                console.log("xhr.responseText = "+ xhr.responseText)
				let jsonObject = JSON.parse( xhr.responseText );
				let i = 0;
                console.log(jsonObject);
                let allContacts = jsonObject.results;
                let table = document.getElementById("searchBody");
                searchBody.innerHTML = "";
                for(let i = 0; i < jsonObject.results.length; i++)
                {
					currentContact = jsonObject.results[i];
					let row = searchBody.insertRow(i);
                    let name = row.insertCell(0);
                    name.innerHTML = currentContact.firstName + " " + currentContact.lastName;
                    console.log(name.innerHTML)
                    name.addEventListener("click", () => displayContact(
                        allContacts[i], i))
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
        document.getElementById("colorSearchResult").innerHTML = err.message;
	}
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
		if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
}