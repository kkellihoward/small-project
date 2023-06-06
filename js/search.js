var urlBase = '/LAMPAPI';
var extension = 'php';
var userId = -1;

function displayContact(people, index)
{
    let person = JSON.stringify(people);
    let currentContact = JSON.parse(person);


    document.getElementById("addSearchDisplay").style.display = 'none';
    document.getElementById("contactContainer").style.display = 'flex';

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
    
    document.getElementById("contactUpdate").style.width = "20rem";
    document.getElementById("contactUpdate").style.marginRight = "3.25rem";
    document.getElementById("contactUpdate").style.marginLeft = "-2.25rem";
    document.getElementById("contactUpdate").style.opacity = "100%";
    document.getElementById("contactEdit").style.width = "0rem";
    document.getElementById("contactEdit").style.opacity = "0%";
}

function startDelete()
{
    document.getElementById("confirmDeletion").style.display = "flex";
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
                document.getElementById("confirmDeletion").style.display = "none";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactUpdateResult").innerHTML = err.message;
    }

    setTimeout(delay, 2000);
                
    function delay () {
        document.getElementById("contactDeleted").innerHTML = "";
        let searchBody = document.getElementById("searchBody");
        searchBody.innerHTML = "";
        document.getElementById("contactContainer").style.display = 'none';
        document.getElementById("addSearchDisplay").style.display = 'contents';
    }

}

function update()
{
    document.getElementById("contactUpdate").style.width = "0rem";
    document.getElementById("contactUpdate").style.marginRight = "0rem";
    document.getElementById("contactUpdate").style.marginLeft = "0rem";
    document.getElementById("contactUpdate").style.opacity = "0%";
    document.getElementById("contactEdit").style.width = "20rem";
    document.getElementById("contactEdit").style.opacity = "100%";
    document.getElementById("contactEdit").style.marginRight = "2rem";

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

    setTimeout(delay, 2000);
                
    function delay () {
        document.getElementById("contactUpdateResult").innerHTML = "";
        let searchBody = document.getElementById("searchBody");
        searchBody.innerHTML = "";
        document.getElementById("contactContainer").style.display = 'none';
        document.getElementById("addSearchDisplay").style.display = 'contents';
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
                
				let jsonObject = JSON.parse( xhr.responseText );
				let i = 0;
                
                let allContacts = jsonObject.results;
                let table = document.getElementById("searchBody");
                searchBody.innerHTML = "";
                console.log(jsonObject)
                let response1 = JSON.parse(xhr.responseText)
                
                if(response1.error.length > 0)
                {
                    document.getElementById("contactSearchResult").innerHTML = "*No Contact Found ";
                    return;
                }
                for(let i = 0; i < jsonObject.results.length; i++)
                {
					currentContact = jsonObject.results[i];
					let row = searchBody.insertRow(i);
                    let name = row.insertCell(0);
                    name.innerHTML = currentContact.firstName + " " + currentContact.lastName;
 
                    name.addEventListener("click", () => displayContact(
                        allContacts[i], i))
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
        document.getElementById("contactSearchResult").innerHTML = err.message;
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