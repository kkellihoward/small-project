<?php

	$inData = getRequestInfo();
    $firstName = "%" . $inData["firstName"] . "%";
    $lastName = "%" . $inData["lastName"] . "%";
    $email = "%" . $inData["email"] . "%";
    $phone = "%" . $inData["phone"] . "%";
    $userId = $inData["userId"];	
	
	$searchResults = "";
	$searchCount = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * FROM Contacts WHERE UserID=? AND firstName LIKE ?
							    	AND lastName LIKE ? AND phone LIKE ? AND email LIKE ?");
		$search = "%" . $inData["search"] . "%";
		$stmt->bind_param("sssss", $userId, $firstName, $lastName, $phone, $email);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"id" : "' . $row["ID"] 
							  . '", "firstName" : "' . $row["FirstName"] 
							  . '", "lastName" : "' . $row["LastName"] 
							  . '", "phone" : "' . $row["Phone"] 
							  . '", "email" : "' . $row["Email"] . '"}'; 
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}