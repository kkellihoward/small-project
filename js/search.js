var urlBase = '/LAMPAPI';
var extension = 'php';

function displayContact(firstName, lastName, email, phone)
{
    document.getElementById("addSearchDisplay").display = none;
    document.getElementById("contactContainer").display = contents;

    document.getElementById("contactFirst").value = firstName;
    document.getElementById("contactFirst").readOnly = true;
    document.getElementById("contactLast").value = lastName;
    document.getElementById("contactLast").readOnly = true;
    document.getElementById("contactEmail").value = email;
    document.getElementById("contactEmail").readOnly = true;
    document.getElementById("contactPhone").value = phone;
    document.getElementById("contactPhone").readOnly = true;
}

function edit()
{
    document.getElementById("contactFirst").readOnly = false;
    document.getElementById("contactLast").readOnly = false;
    document.getElementById("contactEmail").readOnly = false;
    document.getElementById("contactPhone").readOnly = false; 
}

function update()
{
    var localFirst = document.getElementById("contactFirst").value;
    var localLast = document.getElementById("contactLast").value;
    var localEmail = document.getElementById("contactEmail").value;
    var localPhone = document.getElementById("contactPhone").value; 

    document.getElementById("contactAddResult").innerHTML = "";

    var tmp = {firstName:localFirst, lastName:localLast, email:localEmail, phone:localPhone};
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
                document.getElementById("contactAddResult").innerHTML = "Contact has been updated!";
            }
        };
        xhr.send(jsonPayload);
    }
    catch(err)
    {
        document.getElementById("contactAddResult").innerHTML = err.message;
    }
}

function searchContact()
{
	let fName = document.getElementById("fName").value;
    let lName = document.getElementById("lName").value;
    let email = document.getElementById("emailSearch").value;
	let phone = document.getElementById("phoneSearch").value;
	
    document.getElementById("contactSearchResult").innerHTML = "";
	
	let currentContact;

	var tmp = {firstName:fName, lastName:lName, email:email, phone:phone};
	let jsonPayload = JSON.stringify( tmp );

	let url = urlBase + '/SearchContacts.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
                let searchBody = document.getElementById("searchBody");
				document.getElementById("contactSearchResult").innerHTML = "Color(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					currentContact = jsonObject.results[i];
					let row = searchBody.insertRow(i);
                    let name = row.insertCell(0);
                    name.innerHTML = currentContact.firstName + " " + currentContact.lastName;
                    name.addEventListener("click", displayContact(
                        currentContact.firstName, 
                        currentContact.lastName, 
                        currentContact.email, 
                        currentContact.phone))
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